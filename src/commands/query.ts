import { QueryCommand, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 *
 * @param table to execute a 'query' on.
 * @param input
 */
export async function query(input: QueryCommandInput, table?: Function | string): Promise<QueryCommandOutput> {
  if (!input.TableName && table) input.TableName = TableRegistry.instance().getTableName(table);

  return await Client.instance().send<QueryCommand, QueryCommandOutput>(new QueryCommand(input));
}
