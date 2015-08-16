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
oddStorage.SQLite = require('./sql/sqlite')
oddStorage.PostgreSQL = require('./sql/postgresql')

// sync
oddStorage.Memory = require('./sync/memory')

export default oddStorage
