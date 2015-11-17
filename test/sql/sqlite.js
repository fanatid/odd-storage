require('./implementation')({
  describe: describe,
  clsName: 'SQLite',
  storageOpts: {
    filename: ':memory:'
  }
})
