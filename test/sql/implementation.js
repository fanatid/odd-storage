/* global describe, xdescribe, beforeEach, it */
var expect = require('chai').expect

var Promise = require('../promise')
var oddStorage = require('../../')(Promise)

var SQL = {}

SQL['SQLite'] = SQL['WebSQL'] = {
  create: 'CREATE TABLE tmp ( ' +
          '  id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          '  key TEXT, ' +
          '  val INTEGER);',
  insert: 'INSERT INTO tmp (key, val) VALUES ($1, $2)',
  select: 'SELECT * FROM tmp WHERE key = $1',
  drop: 'DROP TABLE tmp;'
}

SQL['PostgreSQL'] = {
  create: 'CREATE TABLE tmp ( ' +
          '  id SERIAL PRIMARY KEY, ' +
          '  key TEXT, ' +
          '  val INTEGER);',
  insert: 'INSERT INTO tmp (key, val) VALUES ($1, $2)',
  select: 'SELECT * FROM tmp WHERE key = $1',
  drop: 'DROP TABLE tmp;'
}

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
    var sql = SQL[opts.clsName]

    beforeEach(function (done) {
      storage = new StorageCls(opts.storageOpts)
      storage.open().then(done, done)
    })

    it('inherits AbstractSQL', function () {
      expect(storage).to.be.instanceof(oddStorage.AbstractSQL)
    })

    it('#executeSQL', function (done) {
      storage.executeSQL(sql.create)
        .then(function () {
          return storage.executeSQL(sql.insert, ['test', 1])
        })
        .then(function () {
          return storage.executeSQL(sql.select, ['test'])
        })
        .then(function (rows) {
          expect(rows).to.be.an('Array').and.to.have.length(1)
          expect(rows[0]).to.have.property('key', 'test')
          expect(rows[0]).to.have.property('val', 1)
          return storage.executeSQL(sql.drop)
        })
        .then(function () { done() }, done)
    })
  })
}
