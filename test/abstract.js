/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('./promise')
var oddStorage = require('../')(Promise)

describe('Abstract', function () {
  var astorage

  beforeEach(function () {
    astorage = new oddStorage.Abstract()
  })

  it('isAvailable return false', function () {
    expect(oddStorage.Abstract.isAvailable()).to.be.false
  })

  it('#isReady', function () {
    expect(astorage.isReady()).to.be.false
  })

  it('#open', function (done) {
    astorage.open()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#_isOpenedCheckPromise', function (done) {
    astorage._isOpenedCheckPromise()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.UnopenedYet)
        done()
      })
  })

  it('#clear', function (done) {
    astorage.clear()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
