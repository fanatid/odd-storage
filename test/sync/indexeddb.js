/* global describe */
'use strict'

require('./implementation')({
  describe: describe,
  clsName: 'IndexedDB',
  storageOpts: {
    dbName: require('crypto').randomBytes(10).toString('hex')
  }
})
