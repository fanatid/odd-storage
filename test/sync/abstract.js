import { expect } from 'chai'

import * as oddStorage from '../../src'

describe('AbstractSync', () => {
  var storage

  beforeEach(() => {
    storage = new oddStorage.AbstractSync()
  })

  it('inherits Abstract', () => {
    expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#set', (done) => {
    storage.set()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#get', (done) => {
    storage.get()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#remove', (done) => {
    storage.remove()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#iterate', (done) => {
    storage.iterate()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#clear', (done) => {
    storage.clear()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
