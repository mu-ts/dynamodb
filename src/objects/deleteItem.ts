import { AttributeValue, DeleteItemCommand, DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { CompositeKey } from './model/CompositeKey';

/**
 * Removes an item from the bucket.
 * @param id of the single item, or a composite key, pointing to the single item.
 * @param table to execute the delete against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 */
export async function deleteItem(id: string | CompositeKey, table: Function | string): Promise<undefined> {
  const idAttribute: string = TableRegistry.instance().getIdAttribute(table) || 'id';
  const input: DeleteItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
    ReturnValues: 'NONE',
    Key: typeof id === 'string' 
      ? 
      {
        [idAttribute]: { S: id }
      } 
      :
      Object.keys(id).reduce((accumulator: Record<string, AttributeValue>, key: string) => {
        accumulator[key] = { S: id[key] }
        return accumulator;
      }, {})

  }

  await Client.instance().send(new DeleteItemCommand(input));

  return undefined;
}
