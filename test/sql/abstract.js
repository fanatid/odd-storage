/* global describe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

describe('AbstractSql', function () {
  var astorage

  beforeEach(function () {
    astorage = new oddStorage.AbstractSql()
  })

  it('inherits Abstract', function () {
    expect(astorage).to.be.instanceof(oddStorage.AbstractSql)
    expect(astorage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#executeSql', function (done) {
    astorage.executeSql()
      .then(function () { throw new Error() })
      .catch(function (err) {
        expect(err).to.be.instanceof(oddStorage.errors.NotImplemented)
        done()
      })
  })
})
