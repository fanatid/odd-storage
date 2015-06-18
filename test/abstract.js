/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('./promise')
var oddStorage = require('../')(Promise)

describe('Abstract', function () {
  var storage

  beforeEach(function () {
    storage = new oddStorage.Abstract()
  })

  it('isAvailable return false', function () {
    expect(oddStorage.Abstract.isAvailable()).to.be.false
  })

  it('#isReady', function () {
    expect(storage.isReady()).to.be.false
  })

  it('#open', function (done) {
    storage.open()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#_isOpenedCheckPromise', function (done) {
    storage._isOpenedCheckPromise()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.UnopenedYet)
        done()
      })
  })

  it('#withLock', function (done) {
    storage._ready()
    storage.ready.then(function () {
      var flag = false

      storage.withLock(function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            flag = true
            resolve()
          }, 50)
        })
      })

      storage.withLock(function () {
        expect(flag).to.be.true
        done()
      })
    })
  })

  it('#clear', function (done) {
    storage.clear()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
