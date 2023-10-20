import { AttributeValueUpdate, UpdateItemCommandInput, UpdateItemCommandOutput, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { toObject } from '@mu-ts/serialization'

import { Client } from '../sugar/guts/Client'
import { TableService } from '../sugar/guts/TableService'

/**
 * Edits an existing item's attributes, or adds a new item to the table if it does not
 * already exist. A full object will be returned in the case of an update.
 * 
 * All items are 'PUT' against the existing record.
 * 
 * @param instance with the the required keys filled out and the attribute values to modify.
 */
export async function UpdateItem<T>(_instance: any): Promise<T> {
  const table: string = TableService.getName(_instance)
  const instance: T = toObject(_instance) as T
  const input: UpdateItemCommandInput = {
    TableName: table,
    Key: marshall(TableService.keyOf(instance)),
    AttributeUpdates: Object.keys(instance).reduce((accumulator: Record<string, AttributeValueUpdate>, key:string) => {
      accumulator[key] = {
        Value: instance[key],
        Action: 'PUT',
      }
      return accumulator
    }, {}),
    ReturnValues: 'ALL_OLD',
  }

  const output: UpdateItemCommandOutput = await Client.instance().send(new UpdateItemCommand(input))

  return unmarshall(output.Attributes) as T
}
