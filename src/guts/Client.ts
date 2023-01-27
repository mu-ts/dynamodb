import {
  DynamoDBClient, DynamoDBClientConfig, ServiceInputTypes, ServiceOutputTypes,  
} from "@aws-sdk/client-dynamodb";

export class Client {
  private static _instance: Client;

  private client: DynamoDBClient;

  private constructor() {
    this.client = new DynamoDBClient({ region: process.env.REGION || process.env.AWS_REGION || process.env.AWS_LAMBDA_REGION });
  }

  public configure(configuration: DynamoDBClientConfig) {
    this.client = new DynamoDBClient(configuration);
  }

  public async send<Input extends ServiceInputTypes, Output extends ServiceOutputTypes>(command: Input): Promise<Output> {
    const response: Output = await this.client.send<Input, Output>(command as any);
    return response;
  }

  public static instance() {
    if (this._instance) return this._instance;
    this._instance = new Client();
    return this._instance;
  }
}