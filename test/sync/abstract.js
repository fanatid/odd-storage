import { expect } from 'chai'

import oddStorage from '../../src'

describe('AbstractSync', () => {
  let storage

  beforeEach(() => {
    storage = new oddStorage.AbstractSync()
  })

  it('inherits Abstract', () => {
    expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#set', () => {
    return expect(storage.set()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })

  it('#get', async () => {
    return expect(storage.get()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })

  it('#remove', async () => {
    return expect(storage.remove()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })

  it('#entries', async () => {
    return expect(storage.entries()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })

  it('#clear', async () => {
    return expect(storage.clear()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })
})
