var metalsmith = require('metalsmith')
var templates = require('metalsmith-templates')
var collections = require('metalsmith-collections')
var serve = require('metalsmith-serve')
var watch = require('metalsmith-watch')
var markdown = require('metalsmith-markdown')
var permalinks = require('metalsmith-permalinks')
var feed = require('metalsmith-feed')
var msstatic = require('metalsmith-static')
var msIf = require('metalsmith-if')

var nunjucks = require('nunjucks')
var njmd = require('nunjucks-markdown')
var njdate = require('nunjucks-date')
var marked = require('marked')

var meow = require('meow')

var cli = meow(`
    Usage
      $ node build.js

    Options
      -w, --watch  Watch the files

    Examples
      $ node build.js --watch

`)

marked.setOptions({
  gfm: true,
  tables: true,
  smartLists: true
})

var njenv = nunjucks.configure({watch: cli.flags.watch})
njmd.register(njenv, marked)

njdate.setDefaultFormat('YYYY-MM-DD, h:mm:ss a')
njdate.install(njenv)

njenv.addFilter('dump', JSON.stringify)

metalsmith(__dirname)
  .metadata({
    site: {
      title: "Starsmith",
      url: 'http://ipfs.io/blog/',
      author: '<a href="http://evbogue.com/">Everett Bogue</a>'
    }
  })
  .use(collections({
    posts: {}
  }))
  .use(markdown())
  .use(templates({ 'directory': '.', 'engine': 'nunjucks', 'inPlace': true }))
  .use(templates({ 'directory': '.', 'engine': 'nunjucks' }))
  // .use(headingsidentifier())
  .use(permalinks())
  .use(feed({'collection': 'posts'}))
  .use(msstatic({'src': 'tmpl/static', 'dest': 'static'}))
  .use(msIf(
    cli.flags.watch,
    serve({
    'port': 8081,
    'verbose': true
    })
  ))
  .use(msIf(
    cli.flags.watch,
    watch()
  ))
  .destination('./build')
  .build(function (err) {
    if (err) {
      console.log(err)
      throw err
    }
  })
