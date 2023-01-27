import { AttributeValue, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { fromDynamo } from '../sugar/fromDynamo';
import { toDynamo } from '../sugar/toDynamo';

/**
 * Creates a new item, or replaces an old item with a new item. If an item that has the
 * same primary key as the new item already exists in the specified table, the new item
 * completely replaces the existing item.
 * 
 * @param table name or class to persist object to.
 * @param object to persist.
 */
export async function PutItem<T>(table: Function | string, object: Record<string, any>): Promise<undefined> {
  const input: PutItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
    Item: toDynamo(object),
    ReturnValues: 'ALL_OLD',
  }

  const output: PutItemCommandOutput = await Client.instance().send(new PutItemCommand(input));
  const totalObject: Record<string, AttributeValue> = { ... output.Attributes, ...input.Item };

  return fromDynamo(totalObject);
}
