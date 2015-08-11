import runImplementationTest from './implementation'

runImplementationTest({
  describe: describe,
  clsName: 'SQLite',
  storageOpts: {
    filename: ':memory:'
  }
})
