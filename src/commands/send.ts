import { Client } from '../guts/Client';
import { ServiceOutputTypes } from "@aws-sdk/client-dynamodb";

/**
 * Light sprinkle of sugar around DynamoDBClient.send.
 * 
 * @param command object to directly send.
 */
export async function send(command: any): Promise<ServiceOutputTypes> {
  const output: ServiceOutputTypes = await Client.instance().send(command);
  return output;
}
