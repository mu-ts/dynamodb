import { KEY_OF_PARTITIONKEY, partitionKey } from "../../decorators/partitionKey"
import { KEY_OF_SORTKEY, sortKey } from "../../decorators/sortKey"
import { TableKey } from "../../model/TableKey"

export class TableService {
  public static readonly PREFIX: string = 'mu-ts/dynamodb'

  private constructor() {
  }

  public static getName(tableOrObject: string | any) {
    if (typeof tableOrObject === 'string') return tableOrObject
    return tableOrObject[this.PREFIX]?.table || tableOrObject.constructor?.[this.PREFIX]?.table
  }

  public static keyOf(instance: any): TableKey {
    const partitionkey: any | undefined = instance.constructor?.[this.PREFIX]?.[KEY_OF_PARTITIONKEY]
    const sortKey: any | undefined = instance.constructor?.[this.PREFIX]?.[KEY_OF_SORTKEY]

    if (!instance[sortKey]) {
      return {
        [partitionkey]: instance[partitionkey],
      }
    } else {
      return {
        [partitionkey]: instance[partitionkey],
        [sortKey]: instance[sortKey],
      }
    }
  }
}