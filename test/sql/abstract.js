/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

describe('AbstractSql', function () {
  var storage

  beforeEach(function () {
    storage = new oddStorage.AbstractSql()
  })

  it('inherits Abstract', function () {
    expect(storage).to.be.instanceof(oddStorage.AbstractSql)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#executeSql', function (done) {
    storage.executeSql()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
