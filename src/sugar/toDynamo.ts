import { AttributeValue } from "@aws-sdk/client-dynamodb"
import { toAttributeValue } from "./toAttributeValue";

export const toDynamo = <T>(object: Record<string, any>): T | Record<string, AttributeValue> => {
  return Object
    .keys(object)
    .reduce((accumulator: Record<string, any>, key: string) => {
      const value: any = object[key];
      const resultingValue: any | undefined = toAttributeValue(value);
      if (!resultingValue) {
        if (value.L) {
          accumulator[key] = value.L.map((item: AttributeValue) => {
            const result: any | undefined = toAttributeValue(item);
            if (!result) return toDynamo(result);
            return result;
          });
        } else if (value.M) {
          accumulator[key] = toDynamo(value.M);
        }
      }

      return accumulator;

    }, {}) as T;
}