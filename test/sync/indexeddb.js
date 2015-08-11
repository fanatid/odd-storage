import { randomBytes } from 'crypto'

import runImplementationTest from './implementation'

runImplementationTest({
  describe: describe,
  clsName: 'IndexedDB',
  storageOpts: {
    prefix: randomBytes(10).toString('hex')
  }
})
