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
app.get("/", (req, res) => { res.redirect(`/en/${pages["en"][Object.keys(pages["en"])[0]].name}`); });
app.use(express.static(`${__dirname}/../public`));

app.get("/:language", (req, res) => {
  if (process.env.NODE_ENV !== "production") readMD();

  let languagePages = pages[req.params.language];
  if (languagePages == null) { res.status(404).send("Language not found"); return; }

  res.redirect(`/${req.params.language}/${Object.keys(languagePages)[0]}`);
});

app.get("/:language/:pageName", (req, res) => {
  if (process.env.NODE_ENV !== "production") readMD();

  let activePage = (pages[req.params.language] != null) ? pages[req.params.language][req.params.pageName] : null;
  if (activePage == null) { res.status(404).send("Page not found"); return; }
  let pageContent = pageContents[req.params.language][req.params.pageName];

  res.render("page", { language: req.params.language, activePage, pageContent, pages: pages[req.params.language] });
});

interface PageDesc {
  name: string;
  title: string;
}

var pages: { [language: string]: { [pageName: string]: PageDesc } } = null;
var pageContents: { [language: string]: { [pageName: string]: string }} = null;

let pageRouter = express.Router();

marked.setOptions({ highlight: (code) => { return highlight.highlight("typescript", code).value; } });

function readMD() {
  let languages = fs.readdirSync(`${__dirname}/../pages`);

  pages = {};
  pageContents = {};

  for (let language of languages) {
    let pageFilenames = fs.readdirSync(`${__dirname}/../pages/${language}`);
    pageFilenames.sort((a, b) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]));

    pages[language] = {};
    pageContents[language] = {};

    for (let pageFilename of pageFilenames) {
      let pageName = pageFilename.split(".", 2)[0].split("_", 2)[1];

      let pageContentMD = fs.readFileSync(`${__dirname}/../pages/${language}/${pageFilename}`, { encoding: "utf8" });
      pageContents[language][pageName] = marked(pageContentMD);
      let pageTitle = pageContentMD.substring(2, pageContentMD.indexOf("\n"));
      pages[language][pageName] = { name: pageName, title: pageTitle };
    }
  }
}
readMD();

let config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, { encoding: "utf8" }));
app.listen(config.port, "127.0.0.1", () => {
  console.log(`Server listening on port ${config.port}`);
});
