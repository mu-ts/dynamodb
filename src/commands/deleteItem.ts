import { DeleteItemCommand, DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { toKey } from '../sugar/toKey';

/**
 * Deletes a single item in a table by primary key.
 * 
 * @param table to execute the delete against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 * @param id of the single item, or a composite key, pointing to the single item.
 */
export async function deleteItem(table: Function | string, ...id: string[]): Promise<undefined> {
  const idAttributes: string[] = TableRegistry.instance().getIdAttributes(table);
  const input: DeleteItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
    ReturnValues: 'NONE',
    Key: toKey(idAttributes, id),
  }

  await Client.instance().send(new DeleteItemCommand(input));

  return undefined;
}
