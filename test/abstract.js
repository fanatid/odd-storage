import { expect } from 'chai'

import * as oddStorage from '../src'

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

  it('#open', (done) => {
    storage.open()
      .then(() => { throw new Error() })
      .catch((err) => {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#_isOpenedCheck', () => {
    expect(::storage._isOpenedCheck).to.throw(oddStorage.errors.UnopenedYet)
  })

  it('#withLock', (done) => {
    storage._ready()
    storage.ready.then(() => {
      var flag = false

      storage.withLock(() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 50)
        })
        .then(() => { flag = true })
      })

      storage.withLock(() => {
        expect(flag).to.be.true
        done()
      })
    })
  })
})
