import { AttributeValue, QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';
import { fromDynamo } from '../sugar/fromDynamo';
import { toAttributeValue } from '../sugar/toAttributeValue';

/**
 * 
 * @param table to execute a query on.
 * @param like 
 * @returns 
 */
export async function query<T>(table: Function | string, expression: Record<string, any> | QueryCommandInput, as?: Function): Promise<T[] | Record<string, AttributeValue>[] | undefined> {

  let input: QueryCommandInput;

  if (!expression.FilterExpression) {
    input = {
      FilterExpression: Object.keys(expression).map((key:string) => `#${key} = :${key}`).join(' AND '),
      ExpressionAttributeNames: Object.keys(expression).reduce((names: Record<string, string>, key:string) => {
        names[`#${key}`] = key;
        return names;
      }, {}),
      ExpressionAttributeValues: Object.keys(expression).reduce((names: Record<string, AttributeValue>, key:string) => {
        names[`:${key}`] = toAttributeValue((expression as Record<string, any>)[key]);
        return names;
      }, {}),
    } as QueryCommandInput;
  } else {
    input = expression as QueryCommandInput;
  }

  input.TableName = TableRegistry.instance().getTableName(table);

  const output: QueryCommandOutput = await Client.instance().send(new QueryCommand(input));

  if (!output.Items) return undefined;

  if (as) {
    return output.Items?.map((item: Record<string, AttributeValue>) => fromDynamo(item) as T);
  }

  return output.Items;
}
