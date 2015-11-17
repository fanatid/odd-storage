require('./implementation')({
  describe: describe,
  clsName: 'PostgreSQL',
  storageOpts: require('../config/postgresql.json')
})
