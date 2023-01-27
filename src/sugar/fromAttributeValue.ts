import { AttributeValue } from "@aws-sdk/client-dynamodb"

export const fromAttributeValue = (value: AttributeValue): string | boolean | number | Uint8Array | string[] | Uint8Array[] | undefined  => {

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