import { expect } from 'chai'

import * as oddStorage from '../../src'

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

    beforeEach((done) => {
      storage = new StorageCls(opts.storageOpts)
      storage.open().then(done, done)
    })

    afterEach((done) => {
      storage.clear().then(done, done)
    })

    it('inherits AbstractSync', () => {
      expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    })

    it('#set', (done) => {
      Promise.resolve()
        .then(async () => {
          await storage.set('1', '1')
          let value1 = await storage.get('1')
          expect(value1).to.equal('1')

          await storage.set('1', '2')
          let value2 = await storage.get('1')
          expect(value2).to.equal('2')
        })
        .then(done, done)
    })

    it('#get', (done) => {
      Promise.resolve()
        .then(async () => {
          let value1 = await storage.get('1')
          expect(value1).to.be.null

          await storage.set('1', '3')
          let value2 = await storage.get('1')
          expect(value2).to.equal('3')
        })
        .then(done, done)
    })

    it('#iterate', (done) => {
      Promise.resolve()
        .then(async () => {
          let obj = {'1': '4', '2': '5'}
          let keys = Object.keys(obj)

          await Promise.all(keys.map((key) => {
            return storage.set(key, obj[key])
          }))

          await storage.iterate((key, value) => {
            expect(value).to.equal(obj[key])

            let idx = keys.indexOf(key)
            if (idx !== -1) {
              keys.splice(idx, 1)
            }
          })

          expect(keys).to.deep.equal([])
        })
        .then(done, done)
    })

    it('#remove', (done) => {
      Promise.resolve()
        .then(async () => {
          await storage.set('1', '6')
          let value1 = await storage.get('1')
          expect(value1).to.equal('6')

          await storage.remove('1')
          let value2 = await storage.get('1')
          expect(value2).to.be.null
        })
        .then(done, done)
    })
  })
}
