import { AttributeValue } from "@aws-sdk/client-dynamodb";

/**
 * It is expected there is a direct correlation between the attributes names on an object and
 * those that DynamoDB are expecting.
 * 
 * @param attributes to build key using.
 * @param object to pull values from.
 * @returns 
 */
export const toKey = (attributes: string[], source: Record<string, any> | string[]): Record<string, AttributeValue> =>  {
  return attributes.reduce((accumulator: Record<string, AttributeValue>, key: string, index: number) => {
    if (Array.isArray(source)) accumulator[key] = { S: source[index] }
    else accumulator[key] = { S: source[key] }
    return accumulator;
  }, {})
}