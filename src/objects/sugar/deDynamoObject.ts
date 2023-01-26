import { AttributeValue } from "@aws-sdk/client-dynamodb"

const toPrimitive = (value: AttributeValue) => {

  /**
   * @see https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html
   */

  if (value.B) return value.B as Uint8Array;
  else if (value.BOOL) return value.BOOL as boolean;
  else if (value.BS) return value.BS as Uint8Array[];
  else if (value.N) return Number(value.N);
  else if (value.S) return value.S;
  else if (value.SS) return value.SS;
  else if (value.NS) return value.NS;
  else value.$unknown;
}

export const deDynamoObject = <T>(dynamoObject: Record<string, AttributeValue>): T => {
  return Object
    .keys(dynamoObject)
    .reduce((accumulator: Record<string, any>, key: string) => {

      const value: AttributeValue = dynamoObject[key];
      const resultingValue: any | undefined = toPrimitive(value);

      if (!resultingValue) {
        if (value.L) {
          accumulator[key] = value.L.map((item: AttributeValue) => {
            const result: any | undefined = toPrimitive(item);
            if (!result) return deDynamoObject(result);
            return result;
          });
        } else if (value.M) {
          accumulator[key] = deDynamoObject(value.M);
        }
      }

      return accumulator;

    }, {}) as T;
}