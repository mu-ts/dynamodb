import { AttributeValue, GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { CompositeKey } from './model/CompositeKey';
import { deDynamoObject } from './sugar/deDynamoObject';

/**
 * Removes an item from the bucket.
 * @param id of the single item, or a composite key, pointing to the single item.
 * @param table to execute the Get against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 */
export async function getItem(id: string | CompositeKey, table: Function | string): Promise<undefined> {
  const idAttribute: string = TableRegistry.instance().getIdAttribute(table) || 'id';
  const input: GetItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
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

  const output: GetItemCommandOutput = await Client.instance().send(new GetItemCommand(input));

  

  return deDynamoObject(output.Item);
}
