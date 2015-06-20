/* global describe */
'use strict'

require('./implementation')({
  describe: describe,
  clsName: 'WebSQL',
  storageOpts: {
    dbName: require('crypto').randomBytes(10).toString('hex')
  }
})
