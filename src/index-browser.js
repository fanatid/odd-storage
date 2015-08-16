let oddStorage = {}

// version
oddStorage.version = require('../package.json')

// errors
oddStorage.errors = require('./errors')

// abstract
oddStorage.Abstract = require('./abstract')
oddStorage.AbstractSQL = require('./sql/abstract')
oddStorage.AbstractSync = require('./sync/abstract')

// sql
oddStorage.WebSQL = require('./sql/websql')

// sync
oddStorage.Memory = require('./sync/memory')
oddStorage.IndexedDB = require('./sync/indexeddb')
oddStorage.LocalStorage = require('./sync/localstorage')

export default oddStorage
