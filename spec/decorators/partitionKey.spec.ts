import { expect } from 'chai'
import { describe, it } from 'mocha'

import { TableService } from '../../src/sugar/guts/TableService'
import { partitionKey } from '../../src/decorators/partitionKey'
import { table } from '../../src/decorators/table'


describe('@partitionKey', () => {
  it('decorates a field', () => {

    @table('x')
    class EncodeUser{
      @partitionKey
      public test: string = ''
    }

    const attributes: any = EncodeUser[TableService.PREFIX].partitionKey

    expect(attributes).to.equals('test')
  })
})
