/// <reference path="../typings/tsd.d.ts" />

import * as path from "path";
import * as fs from "fs";
import * as express from "express";
const expose = require("express-expose"); // import * as expose from "express-expose";
const stylus = require("stylus"); // import * as stylus from "stylus";
const nib = require("nib"); // import * as nib from "nib";
import * as marked from "marked";
const hljs = require("highlight.js"); // import * as highlight from "highlight.js";


const app: express.Express = expose(express());
app.set("views", `${__dirname}/views`);
app.set("view engine", "jade");

app.use(stylus.middleware({
  src: `${__dirname}/`,
  dest: `${__dirname}/../public`,
  compile: (str: string, path: string) => { return stylus(str).use(nib()).set("filename", path).set("compress", true); }
}));
app.get("/styles/highlight.css", (req, res) => { res.sendFile(path.resolve(`${__dirname}/../node_modules/highlight.js/styles/railscasts.css`)) });

interface Category {
  name: string;
  title: string;
  pages: { [pageName: string]: PageDesc };
}

interface PageDesc {
  name: string;
  title: string;
}

let languages: { [languageCode: string]: string } = null;
let pages: { [languageCode: string]: { [categoryName: string]: Category } } = null;
let pageContents: { [languageCode: string]: { [categoryName: string]: { [pageName: string]: string } } } = null;

app.get("/", (req, res) => {
  let languageCode = req.header("Accept-Language");

  if (languageCode != null) {
    languageCode = languageCode.split(",")[0];
    if (languages[languageCode] == null && languageCode.indexOf("-") !== -1) {
      languageCode = languageCode.split("-")[0];
    }
  }

  if (languages[languageCode] == null) languageCode = "en";

  const firstCategoryName = Object.keys(pages[languageCode])[0];
  const firstCategory = pages[languageCode][firstCategoryName];
  res.redirect(`/${languageCode}/${firstCategoryName}/${firstCategory.pages[Object.keys(firstCategory.pages)[0]].name}`);
});
app.use(express.static(`${__dirname}/../public`));

app.get("/:languageCode", (req, res, next) => {
  if (process.env.NODE_ENV !== "production") readMD();

  const languagePages = pages[req.params.languageCode];
  if (languagePages == null) { next(); return; }

  const firstCategoryName = Object.keys(languagePages)[0];
  const firstCategory = languagePages[firstCategoryName];

  res.redirect(`/${req.params.languageCode}/${firstCategoryName}/${firstCategory.pages[Object.keys(firstCategory.pages)[0]].name}`);
});

app.get("/:languageCode/:categoryName/:pageName", (req, res, next) => {
  if (process.env.NODE_ENV !== "production") readMD();

  const activePages = pages[req.params.languageCode];

  const activeCategory = (activePages != null) ? activePages[req.params.categoryName] : null;
  const activePage = (activeCategory != null) ? activeCategory.pages[req.params.pageName] : null;
  if (activePage == null) { next(); return; }

  const pageContent = pageContents[req.params.languageCode][req.params.categoryName][req.params.pageName];

  (res as any).expose({
    pages: pages,
    categoryIndex: Object.keys(activePages).indexOf(req.params.categoryName),
    pageIndex: Object.keys(activeCategory.pages).indexOf(req.params.pageName)
  });
  res.render("page", { activeLanguageCode: req.params.languageCode, activeCategory, activePage, pageContent, pages, languages });
});

app.use((req, res, next) => {
  let languageCode = req.path.split("/")[1];
  if (pages[languageCode] == null) languageCode = "en";
  const pageContent = pageContents[languageCode]["misc"]["404"];

  // Terrible hack for grabbing the page title, woops
  const activePage = { name: "404", title: pageContent.substring(pageContent.indexOf(">") + 1, pageContent.indexOf("\n") - 5) };

  res.status(404).render("page", { activeLanguageCode: languageCode, activePage, pageContent, pages, languages });
});

marked.setOptions({ highlight: (code, lang) => {
    if (lang == null) lang = "typescript";
    return hljs.highlight(lang, code).value;
  }
});

function readMD() {
  let languageCodes = fs.readdirSync(`${__dirname}/../pages`);

  languages = {};
  pages = {};
  pageContents = {};

  for (const languageCode of languageCodes) {
    let language = fs.readFileSync(`${__dirname}/../pages/${languageCode}/index.md`, { encoding: "utf8" });
    language = language.substring(2, language.indexOf("\n"));
    languages[languageCode] = language;

    let categoryFolders = fs.readdirSync(`${__dirname}/../pages/${languageCode}`);
    categoryFolders = categoryFolders.filter((x) => x.indexOf(".") === -1);
    categoryFolders.sort((a, b) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]));

    pages[languageCode] = {};
    pageContents[languageCode] = {
      misc: {
        "404": marked(fs.readFileSync(`${__dirname}/../pages/${languageCode}/404.md`, { encoding: "utf8" }))
      }
    };

    for (const categoryFolder of categoryFolders) {
      const categoryName = categoryFolder.split(".", 2)[0].split("_", 2)[1];
      const category: Category = pages[languageCode][categoryName] = { title: categoryName, name: categoryName, pages: {} };
      pageContents[languageCode][categoryName] = {};

      const pageFilenames = fs.readdirSync(`${__dirname}/../pages/${languageCode}/${categoryFolder}`);
      pageFilenames.sort((a, b) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]));
      for (const pageFilename of pageFilenames) {
        const pageName = pageFilename.split(".", 2)[0].split("_", 2)[1];

        const pageContentMD = fs.readFileSync(`${__dirname}/../pages/${languageCode}/${categoryFolder}/${pageFilename}`, { encoding: "utf8" });
        const pageTitle = pageContentMD.substring(2, pageContentMD.indexOf("\n"));

        if (pageFilename === "index.md") {
          category.title = pageTitle;
        } else {
          pageContents[languageCode][categoryName][pageName] = marked(pageContentMD);
          category.pages[pageName] = { name: pageName, title: pageTitle };
        }
      }
    }
  }

  const englishCategoryNames = Object.keys(pages["en"]);

  for (const language in pages) {
    if (language === "en") continue;

    const categories = pages[language];
    if (Object.keys(categories).length < englishCategoryNames.length) {
      for (let i = Object.keys(categories).length; i < englishCategoryNames.length; i++) {
        categories[englishCategoryNames[i]] = pages["en"][englishCategoryNames[i]];
        pageContents[language][englishCategoryNames[i]] = pageContents["en"][englishCategoryNames[i]];
      }
    }

    const languageCategoryNames = Object.keys(categories);
    for (let i = 0; i < languageCategoryNames.length; i++) {
      const category = categories[languageCategoryNames[i]];
      const englishCategory = pages["en"][englishCategoryNames[i]];
      const englishPageNames = Object.keys(englishCategory.pages);

      if (Object.keys(category.pages).length < englishPageNames.length) {
        for (let j = Object.keys(category.pages).length; j < englishPageNames.length; j++) {
          category.pages[englishPageNames[j]] = englishCategory.pages[englishPageNames[j]];
          pageContents[language][category.name][englishPageNames[j]] = pageContents["en"][englishCategoryNames[i]][englishPageNames[j]];
        }
      }
    }
  }
}
readMD();

let config: any;
try {
  config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, { encoding: "utf8" }));
} catch (err) {
  config = {
    port: 9051
  };
}

app.listen(config.port, "127.0.0.1", () => {
  console.log(`Server listening on port ${config.port}`);
});
