import { expect } from 'chai'
import { describe, it } from 'mocha'

import { TableService } from '../../src/sugar/guts/TableService'
import { sortKey } from '../../src/decorators/sortKey'
import { table } from '../../src/decorators/table'


describe('@sortKey', () => {
  it('decorates a field', () => {

    @table('x')
    class EncodeUser{
      @sortKey
      public test: string = ''
    }

    const attributes: any = EncodeUser[TableService.PREFIX].sortKey

    expect(attributes).to.equals('test')
  })
})
