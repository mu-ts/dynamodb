import { DeleteItemCommand, DeleteItemCommandInput, DeleteItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 * Deletes a single item in a table by primary key.
 * 
 * @param table to execute the 'delete' against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 * @param input
 */
export async function deleteItem(table: Function | string, input: DeleteItemCommandInput): Promise<DeleteItemCommandOutput> {
  input.TableName = TableRegistry.instance().getTableName(table);

  return await Client.instance().send<DeleteItemCommand, DeleteItemCommandOutput>(new DeleteItemCommand(input));
}
