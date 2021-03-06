# odd-storage

[![NPM Package](https://img.shields.io/npm/v/odd-storage.svg?style=flat-square)](https://www.npmjs.org/package/odd-storage)
[![Build Status](https://img.shields.io/travis/fanatid/odd-storage.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/odd-storage)
[![Coverage Status](https://img.shields.io/coveralls/fanatid/odd-storage.svg?style=flat-square)](https://coveralls.io/r/fanatid/odd-storage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Dependency status](https://img.shields.io/david/fanatid/odd-storage.svg?style=flat-square)](https://david-dm.org/fanatid/odd-storage#info=dependencies)

odd-storage is JavaScript library that has two interfaces ([sql](#abstractsql) and [sync](#abstractsync)) for store data in node.js and browsers.

## Example

```js
import oddStorage from 'odd-storage'

let storage = new oddStorage.LocalStorage({prefix: '...'})

$('#change-balance-btn').click(() => {
  storage.withLock(async () => {
    let user = $('#change-balance-user')
    let value = parseInt($('#change-balance-value').val(), 10)
    $('#change-balance-value').val('')

    let isAllow = await request(..., {value: value})
    if (!isAllow) {
      return setTimeout(() => {
        alert(`Action forbidden for user: ${user}, value: ${value}`)
      }, 0)
    }

    let balance = await storage.get(user)
    let newBalance = (balance === null ? 0 : balance) + value

    await storage.set(user, newBalance)
    setTimeout(() => {
      alert(`Balance changed for user: ${user}, new balance: ${balance}`)
    }, 0)
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
      * [keys](#keys)
      * [values](#values)
      * [entries](#entries)
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

#### entries

**return**: `Promise<Iterable<{key: string, value: string}>>`

#### clear

  * `string` key

**return**: `Promise`

## Alternatives

  * [localForage](https://github.com/mozilla/localForage)
  * [pouchdb](https://github.com/pouchdb/pouchdb)

## License

This software is licensed under the MIT License.
