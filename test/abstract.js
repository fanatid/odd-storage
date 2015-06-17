/* global describe, it */
var expect = require('chai').expect

var Promise = require('./promise')
var oddStorage = require('../')(Promise)

describe('Abstract', function () {
  it('isAvailable return false', function () {
    expect(oddStorage.Abstract.isAvailable()).to.be.false
  })

  it('#isReady', function () {
    var astorage = new oddStorage.Abstract()
    expect(astorage.isReady()).to.be.false
  })

  it('#open', function (done) {
    var astorage = new oddStorage.Abstract()
    astorage.open()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#_isOpenedCheckPromise', function (done) {
    var astorage = new oddStorage.Abstract()
    astorage._isOpenedCheckPromise()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.UnopenedYet)
        done()
      })
  })

  it('#clear', function (done) {
    var astorage = new oddStorage.Abstract()
    astorage.clear()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
