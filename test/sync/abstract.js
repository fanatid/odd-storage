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

  it('#set', async () => {
    try {
      await storage.set()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })

  it('#get', async () => {
    try {
      await storage.get()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })

  it('#remove', async () => {
    try {
      await storage.remove()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })

  it('#keys', async () => {
    try {
      await storage.keys()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })

  it('#entries', async () => {
    try {
      await storage.entries()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })

  it('#clear', async () => {
    try {
      await storage.clear()
      throw new Error()
    } catch (err) {
      expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
    }
  })
})
