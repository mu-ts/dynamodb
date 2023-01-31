import { BatchWriteItemCommand, BatchWriteItemCommandInput, BatchWriteItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';

/**
 *
 * @param input
 */
export async function batchWriteItems(input: BatchWriteItemCommandInput): Promise<BatchWriteItemCommandOutput> {
  return await Client.instance().send<BatchWriteItemCommand, BatchWriteItemCommandOutput>(new BatchWriteItemCommand(input));
}
