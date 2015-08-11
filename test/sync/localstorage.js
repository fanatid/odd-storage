import { randomBytes } from 'crypto'

import runImplementationTest from './implementation'

runImplementationTest({
  describe: describe,
  clsName: 'LocalStorage',
  storageOpts: {
    prefix: randomBytes(10).toString('hex')
  }
})
