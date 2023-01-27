import { AttributeValue, AttributeValueUpdate, UpdateItemCommand, UpdateItemCommandInput, UpdateItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { fromDynamo } from '../sugar/fromDynamo';
import { toDynamo } from '../sugar/toDynamo';
import { toKey } from '../sugar/toKey';

/**
 * Edits an existing item's attributes, or adds a new item to the table if it does not
 * already exist. A full object will be returned in the case of an update.
 * 
 * All items are 'PUT' against the existing record.
 * 
 * @param table name or class to persist object to.
 * @param object to persist.
 */
export async function UpdateItem<T>(table: Function | string, object: Record<string, any>): Promise<undefined> {
  const idAttributes: string[] = TableRegistry.instance().getIdAttributes(table);
  const objectToPush: Record<string, AttributeValue> = toDynamo(object);
  const input: UpdateItemCommandInput = {
    TableName: TableRegistry.instance().getTableName(table),
    Key: toKey(idAttributes, object),
    AttributeUpdates: Object.keys(objectToPush).reduce((accumulator: Record<string, AttributeValueUpdate>, key:string) => {
      accumulator[key] = {
        Value: objectToPush[key],
        Action: 'PUT',
      }
      return accumulator;
    }, {}),
    ReturnValues: 'ALL_OLD',
  }

  const output: UpdateItemCommandOutput = await Client.instance().send(new UpdateItemCommand(input));
  const totalObject: Record<string, AttributeValue> = { ... output.Attributes, ...objectToPush };

  return fromDynamo(totalObject);
}
