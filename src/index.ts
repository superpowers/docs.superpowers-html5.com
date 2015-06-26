/// <reference path="../typings/tsd.d.ts" />

import * as path from "path";
import * as fs from "fs";
import * as express from "express";
let stylus = require("stylus"); // import * as stylus from "stylus";
let nib = require("nib"); // import * as nib from "nib";
import * as marked from "marked";
let highlight = require("highlight.js"); // import * as highlight from "highlight.js";

let app = express();
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

let pages: { [language: string]: { [categoryName: string]: Category } } = null;
let pageContents: { [language: string]: { [categoryName: string]: { [pageName: string]: string } } } = null;

app.get("/", (req, res) => {
  let firstCategoryName = Object.keys(pages["en"])[0];
  let firstCategory = pages["en"][firstCategoryName];
  res.redirect(`/en/${firstCategoryName}/${firstCategory.pages[Object.keys(firstCategory.pages)[0]].name}`);
});
app.use(express.static(`${__dirname}/../public`));

app.get("/:language", (req, res) => {
  if (process.env.NODE_ENV !== "production") readMD();

  let languagePages = pages[req.params.language];
  if (languagePages == null) { res.status(404).render("404", { language: "en", pages: pages["en"] }); return; }

  let firstCategoryName = Object.keys(languagePages)[0];
  let firstCategory = languagePages[firstCategoryName];

  res.redirect(`/${req.params.language}/${firstCategoryName}/${firstCategory.pages[Object.keys(firstCategory.pages)[0]].name}`);
});

app.get("/:language/:categoryName/:pageName", (req, res) => {
  if (process.env.NODE_ENV !== "production") readMD();

  let activeCategory = (pages[req.params.language] != null) ? pages[req.params.language][req.params.categoryName] : null;
  let activePage = (activeCategory != null) ? activeCategory.pages[req.params.pageName] : null;
  if (activePage == null) { res.status(404).render("404", { language: req.params.language, pages: pages[req.params.language] }); return; }

  let pageContent = pageContents[req.params.language][req.params.categoryName][req.params.pageName];

  res.render("page", { language: req.params.language, activeCategory, activePage, pageContent, pages: pages[req.params.language] });
});

app.use((req, res, next) => {
  res.status(404).render("404", { language: "en", pages: pages["en"] });
});

marked.setOptions({ highlight: (code) => { return highlight.highlight("typescript", code).value; } });

function readMD() {
  let languages = fs.readdirSync(`${__dirname}/../pages`);

  pages = {};
  pageContents = {};

  for (let language of languages) {
    let categoryFolders = fs.readdirSync(`${__dirname}/../pages/${language}`);
    categoryFolders.sort((a, b) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]));

    pages[language] = {};
    pageContents[language] = {};

    for (let categoryFolder of categoryFolders) {
      let categoryName = categoryFolder.split(".", 2)[0].split("_", 2)[1];
      let category: Category = pages[language][categoryName] = { title: categoryName, name: categoryName, pages: {} };
      pageContents[language][categoryName] = {};

      let pageFilenames = fs.readdirSync(`${__dirname}/../pages/${language}/${categoryFolder}`);
      pageFilenames.sort((a, b) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]));
      for (let pageFilename of pageFilenames) {
        let pageName = pageFilename.split(".", 2)[0].split("_", 2)[1];

        let pageContentMD = fs.readFileSync(`${__dirname}/../pages/${language}/${categoryFolder}/${pageFilename}`, { encoding: "utf8" });
        let pageTitle = pageContentMD.substring(2, pageContentMD.indexOf("\n"));

        if (pageFilename === "index.md") {
          category.title = pageTitle;
        } else {
          pageContents[language][categoryName][pageName] = marked(pageContentMD);
          category.pages[pageName] = { name: pageName, title: pageTitle };
        }
      }
    }
  }

  let englishCategoryNames = Object.keys(pages["en"]);

  for (let language in pages) {
    if (language === "en") continue;

    let categories = pages[language];
    if (Object.keys(categories).length < englishCategoryNames.length) {
      for (let i = Object.keys(categories).length; i < englishCategoryNames.length; i++) {
        categories[englishCategoryNames[i]] = pages["en"][englishCategoryNames[i]];
        pageContents[language][englishCategoryNames[i]] = pageContents["en"][englishCategoryNames[i]];
      }
    }

    let languageCategoryNames = Object.keys(categories);
    for (let i = 0; i < languageCategoryNames.length; i++) {
      let category = categories[languageCategoryNames[i]];
      let englishCategory = pages["en"][englishCategoryNames[i]];
      let englishPageNames = Object.keys(englishCategory.pages);

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

let config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, { encoding: "utf8" }));
app.listen(config.port, "127.0.0.1", () => {
  console.log(`Server listening on port ${config.port}`);
});
