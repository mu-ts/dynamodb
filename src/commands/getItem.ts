import { AttributeValue, GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { fromDynamo } from '../sugar/fromDynamo';
import { toKey } from '../sugar/toKey';

/**
 * Returns the object for the item with the given primary key. If there is no matching object, 
 * undefined is returned.
 * 
 * @param table to execute the Get against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 * @param id of the single item, or a composite key, pointing to the single item.
 */
export async function getItem(table: Function | string, ...id: string[]): Promise<undefined> {
  const idAttributes: string[] = TableRegistry.instance().getIdAttributes(table);
  const input: GetItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
    Key: toKey(idAttributes, id)

  }

  const output: GetItemCommandOutput = await Client.instance().send(new GetItemCommand(input));

  return output.Item ? fromDynamo(output.Item) : undefined;
}
