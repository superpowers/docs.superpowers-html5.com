path = require 'path'
express = require 'express'
app = express()
app.set 'views', "#{__dirname}/views"
app.set 'view engine', 'jade'

stylus = require 'stylus'
nib = require 'nib'
app.use stylus.middleware {
  src: "#{__dirname}/"
  dest: "#{__dirname}/../public"
  compile: (str, path) ->
    stylus(str).use(nib()).set('filename', path).set('compress', true)
}

app.get "/styles/highlight.css", (req, res) -> res.sendFile path.resolve("#{__dirname}/../node_modules/highlight.js/styles/railscasts.css")
app.get "/", (req, res) -> res.redirect "/en/#{pages.en[Object.keys(pages.en)[0]].name}"; return
app.use express.static "#{__dirname}/../public"

app.get "/:language/:pageName", (req, res) ->
  if process.env.NODE_ENV != 'PRODUCTION' then readMD()

  activePage = pages[req.params.language]?[req.params.pageName]
  if ! activePage? then res.status(404).send('Page not found'); return
  pageContent = pageContents[req.params.language][req.params.pageName]

  res.render 'page', { language: req.params.language, activePage, pageContent, pages: pages[req.params.language] }; return

pages = null
pageContents = null

pageRouter = express.Router()

fs = require 'fs'
marked = require 'marked'
highlight = require 'highlight.js'
marked.setOptions { highlight: (code) -> highlight.highlight('typescript', code).value }

readMD = ->
  languages = fs.readdirSync "#{__dirname}/../pages"

  pages = {}
  pageContents = {}

  for language in languages
    pageFilenames = fs.readdirSync "#{__dirname}/../pages/#{language}"
    pageFilenames.sort (a, b) -> parseInt(a.split('_')[0]) - parseInt(b.split('_')[0])

    pages[language] = {}
    pageContents[language] = {}

    for pageFilename in pageFilenames
      pageName = pageFilename.split('.', 2)[0].split('_', 2)[1]

      pageContentMD = fs.readFileSync("#{__dirname}/../pages/#{language}/#{pageFilename}", { encoding: 'utf8' })
      pageContents[language][pageName] = marked pageContentMD
      pageTitle = pageContentMD.substring 2, pageContentMD.indexOf('\n')
      pages[language][pageName] = { name: pageName, title: pageTitle }

readMD()

config = require '../config'
app.listen config.port, ->
  console.log "Server listening on port #{config.port}"
