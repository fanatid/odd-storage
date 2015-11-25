import { expect } from 'chai'

import oddStorage from '../../src'

export default function (opts) {
  let StorageCls = oddStorage[opts.clsName]
  if (StorageCls === undefined) {
    return
  }

  let ndescribe = opts.describe || describe
  if (StorageCls.isAvailable() === false) {
    ndescribe = xdescribe
  }

  ndescribe(opts.clsName, () => {
    let storage

    beforeEach(() => {
      storage = new StorageCls(opts.storageOpts)
      return storage.open()
    })

    afterEach(() => {
      return storage.clear()
    })

    it('inherits AbstractSync', () => {
      expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    })

    it('#set', async () => {
      await storage.set('1', '1')
      let value1 = await storage.get('1')
      expect(value1).to.equal('1')

      await storage.set('1', '2')
      let value2 = await storage.get('1')
      expect(value2).to.equal('2')
    })

    it('#get', async () => {
      let value1 = await storage.get('1')
      expect(value1).to.be.null

      await storage.set('1', '3')
      let value2 = await storage.get('1')
      expect(value2).to.equal('3')
    })

    it('#entries', async () => {
      let obj = {'1': '4', '2': '5'}
      let keys = Object.keys(obj)

      await* keys.map(key => storage.set(key, obj[key]))

      for (let {key, value} of await storage.entries()) {
        expect(value).to.equal(obj[key])

        let idx = keys.indexOf(key)
        if (idx !== -1) {
          keys.splice(idx, 1)
        }
      }

      expect(keys).to.deep.equal([])
    })

    it('#remove', async () => {
      await storage.set('1', '6')
      let value1 = await storage.get('1')
      expect(value1).to.equal('6')

      await storage.remove('1')
      let value2 = await storage.get('1')
      expect(value2).to.be.null
    })
  })
}
