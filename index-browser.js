'use strict'

module.exports = require('./lib/wrapper')(function (Promise) {
  var oddStorage = {}

  // version
  oddStorage.version = require('./package.json').version

  // errors
  oddStorage.errors = require('./lib/errors')

  // abstract
  oddStorage.Abstract = require('./lib/abstract')(Promise)
  oddStorage.AbstractSQL = require('./lib/sql/abstract')(Promise)
  oddStorage.AbstractSync = require('./lib/sync/abstract')(Promise)

  // sql
  oddStorage.WebSQL = require('./lib/sql/websql')(Promise)

  // sync
  oddStorage.Memory = require('./lib/sync/memory')(Promise)
  oddStorage.IndexedDB = require('./lib/sync/indexeddb')(Promise)
  oddStorage.LocalStorage = require('./lib/sync/localstorage')(Promise)

  return oddStorage
})
