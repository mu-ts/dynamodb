import { AttributeValue } from "@aws-sdk/client-dynamodb"
import { fromAttributeValue } from "./fromAttributeValue";
export const fromDynamo = <T>(dynamoObject: Record<string, AttributeValue>): T => {
  return Object
    .keys(dynamoObject)
    .reduce((accumulator: Record<string, any>, key: string) => {

      const value: AttributeValue = dynamoObject[key];
      const resultingValue: any | undefined = fromAttributeValue(value);

      if (!resultingValue) {
        if (value.L) {
          accumulator[key] = value.L.map((item: AttributeValue) => {
            const result: any | undefined = fromAttributeValue(item);
            if (!result) return fromDynamo(result);
            return result;
          });
        } else if (value.M) {
          accumulator[key] = fromDynamo(value.M);
        }
      }

      return accumulator;

    }, {}) as T;
}