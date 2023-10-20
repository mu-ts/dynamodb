import { expect } from 'chai'
import { describe, it } from 'mocha'

import { TableService } from '../../../src/sugar/guts/TableService'  // Adjust the import path

describe('TableService', () => {
  it('should return table name when a string is provided', () => {
    const result = TableService.getName('TableName')
    expect(result).to.equal('TableName')
  })

  it('should return table name from object metadata', () => {
    const mockInstance = {
      constructor: {
        'mu-ts/dynamodb': {
          table: 'MockTable'
        }
      }
    }
    const result = TableService.getName(mockInstance)
    expect(result).to.equal('MockTable')
  })

  it('should return keyOf for given instance', () => {
    const mockInstance = {
      constructor: {
        'mu-ts/dynamodb': {
          partitionKey: 'partition',
          sortKey: 'sort'
        }
      },
      partition: 'partitionValue',
      sort: 'sortValue'
    }

    const result = TableService.keyOf(mockInstance)
    expect(result).to.deep.equal({
      partition: 'partitionValue',
      sort: 'sortValue'
    })
  })

  it('should return only partition key if sort key is not present', () => {
    const mockInstance = {
      constructor: {
        'mu-ts/dynamodb': {
          partitionKey: 'partition',
          sortKey: 'sort'
        }
      },
      partition: 'partitionValue'
    }

    const result = TableService.keyOf(mockInstance)
    expect(result).to.deep.equal({
      partition: 'partitionValue'
    })
  })
})
