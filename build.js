var metalsmith = require('metalsmith')
var layouts = require('metalsmith-layouts')
var collections = require('metalsmith-collections')
var serve = require('metalsmith-serve')
var watch = require('metalsmith-watch')
var markdown = require('metalsmith-markdown')
var permalinks = require('metalsmith-permalinks')
var feed = require('metalsmith-feed')
var msstatic = require('metalsmith-static')
var msIf = require('metalsmith-if')
var moment = require('moment')

var meow = require('meow')

var cli = meow(`
    Usage
      $ node build.js

    Options
      -w, --watch  Watch the files

    Examples
      $ node build.js --watch

`)

metalsmith(__dirname)
  .metadata({
    site: {
      title: "Starsmith",
      url: 'http://ipfs.io/blog/',
      author: 'Everett Bogue'
    }
  })
  .use(markdown())
  .use(collections({
       posts: {
               pattern: './*.md',
               sortBy: 'date',
               reverse: 'True'
       }
   }))
  .use(permalinks(
      {pattern: ':collections:title',
       relative: false
  }))
  .use(feed({'collection': 'posts'}))
  .use(layouts({engine: 'jade', moment}))
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
