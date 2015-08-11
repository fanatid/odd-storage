import runImplementationTest from './implementation'

runImplementationTest({
  describe: describe,
  clsName: 'PostgreSQL',
  storageOpts: require('../config/postgresql.json')
})
