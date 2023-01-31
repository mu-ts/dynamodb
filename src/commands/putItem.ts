import { AttributeValue, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 * Creates a new item, or replaces an old item with a new item. If an item that has the
 * same primary key as the new item already exists in the specified table, the new item
 * completely replaces the existing item.
 * 
 * @param table name or class to persist object to.
 * @param input
 */
export async function putItem<T>(table: Function | string, input: PutItemCommandInput): Promise<T | undefined> {
  input.TableName = TableRegistry.instance().getTableName(table);
  input.ReturnValues = 'ALL_OLD';

  const output: PutItemCommandOutput = await Client.instance().send<PutItemCommand, PutItemCommandOutput>(new PutItemCommand(input));
  const totalObject: Record<string, AttributeValue> = { ...output.Attributes, ...input.Item };
  return totalObject ? (unmarshall(totalObject) as T) : undefined;
}
