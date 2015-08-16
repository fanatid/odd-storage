import { expect } from 'chai'

import oddStorage from '../../src'

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

export default function (opts) {
  let StorageCls = oddStorage[opts.clsName]
  if (StorageCls === undefined) {
    return
  }

  let ndescribe = opts.describe || describe
  if (StorageCls.isAvailable() === false) {
    ndescribe = xdescribe
  }

  ndescribe(opts.clsName, () => {
    let storage
    let sql = SQL[opts.clsName]

    beforeEach((done) => {
      storage = new StorageCls(opts.storageOpts)
      storage.open().then(done, done)
    })

    it('inherits AbstractSQL', () => {
      expect(storage).to.be.instanceof(oddStorage.AbstractSQL)
    })

    it('#executeSQL', (done) => {
      Promise.resolve()
        .then(async () => {
          await storage.executeSQL(sql.create)
          await storage.executeSQL(sql.insert, ['test', 1])

          let rows = await storage.executeSQL(sql.select, ['test'])
          expect(rows).to.be.an('Array').and.to.have.length(1)
          expect(rows[0]).to.have.property('key', 'test')
          expect(rows[0]).to.have.property('val', 1)

          await storage.executeSQL(sql.drop)
        })
        .then(done, done)
    })
  })
}
