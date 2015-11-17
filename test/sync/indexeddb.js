require('./implementation')({
  describe: describe,
  clsName: 'IndexedDB',
  storageOpts: {
    prefix: require('crypto').randomBytes(10).toString('hex')
  }
})
