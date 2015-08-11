import { randomBytes } from 'crypto'

import runImplementationTest from './implementation'

runImplementationTest({
  describe: describe,
  clsName: 'WebSQL',
  storageOpts: {
    dbName: randomBytes(10).toString('hex')
  }
})
