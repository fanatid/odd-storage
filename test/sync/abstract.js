/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

describe('AbstractSync', function () {
  var astorage

  beforeEach(function () {
    astorage = new oddStorage.AbstractSync()
  })

  it('inherits Abstract', function () {
    expect(astorage).to.be.instanceof(oddStorage.AbstractSync)
    expect(astorage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#set', function (done) {
    astorage.set()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#get', function (done) {
    astorage.get()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#remove', function (done) {
    astorage.remove()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#iterate', function (done) {
    astorage.iterate()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
