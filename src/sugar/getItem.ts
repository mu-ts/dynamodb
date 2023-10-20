import {  GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { fromObject } from '@mu-ts/serialization'

import { Client } from '../sugar/guts/Client'
import { TableService } from '../sugar/guts/TableService'
import { TableKey } from '../model/TableKey'

/**
 * Returns the object for the item with the given primary key. If there is no matching object, 
 * undefined is returned.
 * 
 * @param keyOrInstance to get item from. If you have a decorated class, then use that class to engage the serialization logic.
 * @param _table string is only required when the first parameter is a TableKey.
 */
export async function getItem<T>(keyOrInstance: TableKey | any, _table?: string): Promise<T | undefined> {
  const table: string = TableService.getName(_table || keyOrInstance)

  const input: GetItemCommandInput = {
    TableName: table,
    Key: marshall(keyOrInstance)
  }

  const output: GetItemCommandOutput = await Client.instance().send(new GetItemCommand(input))

  return output.Item ? fromObject(unmarshall(output.Item), keyOrInstance) as T: undefined
}
