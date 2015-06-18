/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

describe('AbstractSync', function () {
  var storage

  beforeEach(function () {
    storage = new oddStorage.AbstractSync()
  })

  it('inherits Abstract', function () {
    expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#set', function (done) {
    storage.set()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#get', function (done) {
    storage.get()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#remove', function (done) {
    storage.remove()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })

  it('#iterate', function (done) {
    storage.iterate()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
