import { UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 * Edits an existing item's attributes, or adds a new item to the table if it does not
 * already exist. A full object will be returned, in the case of an update.
 * 
 * All items are 'PUT' against the existing record.
 * 
 * @param table name or class to persist object to.
 * @param input
 */
export async function updateItem<T>(input: UpdateItemCommandInput, table?: Function | string): Promise<UpdateItemCommandOutput> {
  if (!input.TableName && table) input.TableName = TableRegistry.instance().getTableName(table);

  return await Client.instance().send<UpdateItemCommand, UpdateItemCommandOutput>(new UpdateItemCommand(input));
}
