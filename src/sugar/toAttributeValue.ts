import { AttributeValue } from "@aws-sdk/client-dynamodb"

export const toAttributeValue = (value: any): AttributeValue => {
  if (typeof value === 'string'){
    return { S: value };
  } else if (typeof value === 'number'){
    return { N: `${value}` };
  } else if (typeof value === 'boolean'){
    return { BOOL: value };
  } else if (value instanceof Date) {
    return { N: `${value.getTime()}` }
  } else {
    return { NULL: true }
  }
}