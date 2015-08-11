# odd-storage

[![build status](https://img.shields.io/travis/fanatid/odd-storage.svg?branch=master&style=flat-square)](http://travis-ci.org/fanatid/odd-storage)
[![Coverage Status](https://img.shields.io/coveralls/fanatid/odd-storage.svg?style=flat-square)](https://coveralls.io/r/fanatid/odd-storage)
[![Dependency status](https://img.shields.io/david/fanatid/odd-storage.svg?style=flat-square)](https://david-dm.org/fanatid/odd-storage#info=dependencies)
[![Dev Dependency status](https://img.shields.io/david/fanatid/odd-storage.svg?style=flat-square)](https://david-dm.org/fanatid/odd-storage#info=devDependencies)

[![NPM](https://nodei.co/npm/odd-storage.png)](https://www.npmjs.com/package/odd-storage)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

odd-storage is JavaScript library that has two interfaces ([sql](#abstractsql) and [sync](#abstractsync)) for store data in node.js and browsers.

## Example

```js
var oddStorage = require('odd-storage')
var storage = new oddStorage.LocalStorage({prefix: '...'})

$('#change-balance-btn').click(function () {
  storage.withLock(function () {
    var user = $('#change-balance-user')
    var value = parseInt($('#change-balance-value').val(), 10)
    $('#change-balance-value').val('')

    return request(..., {value: value})
      .then(function (isAllow) {
        if (!isAllow) {
          return setTimeout(function () {
            alert('Action forbidden for user: ' + user + ', value: ' + value)
          }, 0)
        }

        return storage.get(user)
          .then(function (balance) {
            var newBalance = (balance === null ? 0 : balance) + value
            return storage.set(user, newBalance)
          })
          .then(function () {
            setTimeout(function () {
              alert('Balance changed for user: ' + user + ', new balance ' + balance)
            }, 0)
          })
      })
  })
})
```

## API

  * [Abstract](#abstract)
    * Mixes
      * ready-mixin
    * Methods
      * [open](#open)
      * [withLock](#withlock)
    * Inheritance
      * [AbstractSQL](#abstractsql)
      * [AbstractSync](#abstractsync)
  * [AbstractSQL](#abstractsql)
    * Methods
      * [executeSQL](#executesql)
    * Inheritance
      * [SQLite](#sqlite)
      * [PostgreSQL](#postgresql)
      * [WebSQL](#websql)
  * [AbstractSync](#abstractsync)
    * Methods
      * [set](#set)
      * [get](#get)
      * [remove](#remove)
      * [iterate](#iterate)
      * [clear](#clear)
    * Inheritance
      * [Memory](#memory)
      * [IndexedDB](#indexeddb)
      * [LocalStorage](#localstorage)

### Abstract

#### open

Open storage and set ready state for current instance.

**return**: `Promise`

#### withLock

If you want immutable data between related queries than run all queries in withLock.

  * `function` fn

**return**: `Promise`

### AbstractSQL

#### executeSQL

Execute sql queries with arguments args.

  * `string` sql
  * `Array.<*>` args

**return**: `Promise.<Array>`

### AbstractSync

#### set

  * `string` key
  * `string` value

**return**: `Promise`

#### get

  * `string` key

**return**: `Promise.<?string>`

#### remove

  * `string` key

**return**: `Promise`

#### iterate

Iterate through whole collection. Call callback for every pair key, value.

  * `string` callback

**return**: `Promise`

#### clear

  * `string` key

**return**: `Promise`

## Alternatives

  * [localForage](https://github.com/mozilla/localForage)
  * [pouchdb](https://github.com/pouchdb/pouchdb)

## License

Code released under [the MIT license](LICENSE).
