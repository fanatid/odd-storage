/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

describe('AbstractSQL', function () {
  var storage

  beforeEach(function () {
    storage = new oddStorage.AbstractSQL()
  })

  it('inherits Abstract', function () {
    expect(storage).to.be.instanceof(oddStorage.AbstractSQL)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#executeSQL', function (done) {
    storage.executeSQL()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
