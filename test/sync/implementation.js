/* global describe, xdescribe, beforeEach, afterEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

module.exports = function (opts) {
  var StorageCls = oddStorage[opts.clsName]
  if (StorageCls === undefined) {
    return
  }

  var ndescribe = opts.describe || describe
  if (StorageCls.isAvailable() === false) {
    ndescribe = xdescribe
  }

  ndescribe(opts.clsName, function () {
    var storage

    beforeEach(function (done) {
      storage = new StorageCls(opts.storageOpts)
      storage.open().then(done, done)
    })

    afterEach(function (done) {
      storage.clear().then(done, done)
    })

    it('inherits AbstractSync', function () {
      expect(storage).to.be.instanceof(oddStorage.AbstractSync)
    })

    it('#set', function (done) {
      storage.set('1', '1')
        .then(function () {
          return storage.get('1')
        })
        .then(function (result) {
          expect(result).to.equal('1')
          return storage.set('1', '2')
        })
        .then(function () {
          return storage.get('1')
        })
        .then(function (result) {
          expect(result).to.equal('2')
        })
        .then(done, done)
    })

    it('#get', function (done) {
      storage.get('1')
        .then(function (result) {
          expect(result).to.be.null
          return storage.set('1', '3')
        })
        .then(function () {
          return storage.get('1')
        })
        .then(function (result) {
          expect(result).to.equal('3')
        })
        .then(done, done)
    })

    it('#remove', function (done) {
      storage.set('1', '4')
        .then(function () {
          return storage.get('1')
        })
        .then(function (result) {
          expect(result).to.equal('4')
          return storage.remove('1')
        })
        .then(function () {
          return storage.get('1')
        })
        .then(function (result) {
          expect(result).to.be.null
        })
        .then(done, done)
    })

    it('#iterate', function (done) {
      var obj = {'1': '5', '2': '6'}
      var keys = Object.keys(obj)
      Promise.all(keys.map(function (key) {
        return storage.set(key, obj[key])
      }))
      .then(function () {
        return storage.iterate(function (key, value) {
          expect(value).to.equal(obj[key])

          var index = keys.indexOf(key)
          if (index !== -1) {
            keys.splice(index, 1)
          }
        })
      })
      .then(function () {
        expect(keys).to.deep.equal([])
      })
      .then(done, done)
    })
  })
}
