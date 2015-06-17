'use strict'

module.exports = require('./lib/wrapper')(function (Promise) {
  var oddStorage = {}

  // version
  oddStorage.version = require('./package.json').version

  // errors
  oddStorage.errors = require('./lib/errors')

  // abstract
  oddStorage.Abstract = require('./lib/abstract')(Promise)

  return oddStorage
})
