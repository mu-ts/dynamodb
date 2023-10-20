import { DeleteItemCommand, DeleteItemCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

import { TableKey } from '../model/TableKey'
import { Client } from './guts/Client'
import { TableService } from './guts/TableService'


/**
 * Deletes a single item in a table by primary key.
 * 
 * @param tableKey or instance, to be deleted.
 * @param _table to lookup the TableKey and delete the item. Not needed if an instance is provided.
 */
export async function deleteItem(keyOrInstance: TableKey | any, _table?: string): Promise<undefined> {
  const table: string = TableService.getName(_table || keyOrInstance)
  const input: DeleteItemCommandInput = {
    TableName: table,
    ReturnValues: 'NONE',
    Key: marshall(keyOrInstance),
  }

  await Client.instance().send(new DeleteItemCommand(input))

  return undefined
}
