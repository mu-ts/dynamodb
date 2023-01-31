import { ServiceOutputTypes } from "@aws-sdk/client-dynamodb";
import { Client } from '../guts/Client';

/**
 * Light sprinkle of sugar around DynamoDBClient.send.
 * 
 * @param command object to directly send.
 */
export async function send(command: any): Promise<ServiceOutputTypes> {
  return await Client.instance().send(command);
}
