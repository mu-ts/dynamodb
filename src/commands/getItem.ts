import { GetItemCommand, GetItemCommandInput, GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 * Returns the object for the item with the given primary key. If there is no matching object, 
 * undefined is returned.
 * 
 * @param table to execute the 'get' against, can be the key of a registered table, class that has been decorated to a table, event property to locate the table name, or it will be used directly as the table name.
 * @param input
 */
export async function getItem<T>(table: Function | string, input: GetItemCommandInput): Promise<T | undefined> {
  input.TableName = TableRegistry.instance().getTableName(table);

  const output: GetItemCommandOutput = await Client.instance().send<GetItemCommand, GetItemCommandOutput>(new GetItemCommand(input));
  return output.Item ? (unmarshall(output.Item) as T) : undefined;
}
