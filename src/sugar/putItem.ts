import { PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { toObject } from '@mu-ts/serialization'

import { Client } from '../sugar/guts/Client'
import { TableService } from '../sugar/guts/TableService'

/**
 * Creates a new item, or replaces an old item with a new item. If an item that has the
 * same primary key as the new item already exists in the specified table, the new item
 * completely replaces the existing item.
 * 
 * @param table name or class to persist object to.
 * @param object to persist.
 */
export async function PutItem<T>(instance: any, _table?: string): Promise<T> {
  const table: string = TableService.getName(_table || instance)
  
  const input: PutItemCommandInput = {
    TableName: table,
    /***
     * toObject will do nothing if there is no @serialzation decorator on it.
     */
    Item: marshall(toObject(instance)),
    ReturnValues: 'ALL_OLD',
  }

  const output: PutItemCommandOutput = await Client.instance().send(new PutItemCommand(input))

  return unmarshall(output.Attributes) as T
}
