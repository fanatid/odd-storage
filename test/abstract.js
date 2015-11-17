import { expect } from 'chai'

import oddStorage from '../src'

describe('Abstract', () => {
  var storage

  beforeEach(() => {
    storage = new oddStorage.Abstract()
  })

  it('isAvailable return false', () => {
    expect(oddStorage.Abstract.isAvailable()).to.be.false
  })

  it('#isReady', () => {
    expect(storage.isReady()).to.be.false
  })

  it('#open', () => {
    return expect(storage.open()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })

  it('#_isOpenedCheck', () => {
    expect(::storage._isOpenedCheck).to.throw(oddStorage.errors.UnopenedYet)
  })

  it('#withLock', async () => {
    storage._ready(null)
    await storage.ready

    let counter = 0
    await storage.withLock(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
      counter += 1
    })

    await storage.withLock(() => {
      expect(counter).to.equal(1)
    })
  })
})
