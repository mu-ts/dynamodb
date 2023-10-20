import { expect } from 'chai'
import { describe, it } from 'mocha'

import { TableService } from '../../src/sugar/guts/TableService'

import { table } from '../../src/decorators/table'

describe('@serializable', () => {
  it('to decorate class', () => {
    
    @table('x')
    class User {}

    expect(User[TableService.PREFIX]).to.have.property('table').that.equals('x')
  })
})

