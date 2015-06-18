/* global describe */
'use strict'

require('./implementation')({
  describe: describe,
  clsName: 'LocalStorage',
  storageOpts: {
    prefix: require('crypto').randomBytes(10).toString('hex')
  }
})
