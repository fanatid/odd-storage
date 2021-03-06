import { expect } from 'chai'

import oddStorage from '../../src'

describe('AbstractSQL', () => {
  var storage

  beforeEach(() => {
    storage = new oddStorage.AbstractSQL()
  })

  it('inherits Abstract', () => {
    expect(storage).to.be.instanceof(oddStorage.AbstractSQL)
    expect(storage).to.be.instanceof(oddStorage.Abstract)
  })

  it('#executeSQL', () => {
    return expect(storage.executeSQL()).to.be.rejectedWith(oddStorage.errors.NotImplemented)
  })
})
