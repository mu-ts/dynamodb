import { TableService } from "../sugar/guts/TableService"

export const KEY_OF_PARTITIONKEY: string = 'partitionKey'

/**
 * An attribute marked as ignored will not be persisted.
 */
export function partitionKey(originalField: any, context: ClassFieldDecoratorContext): void {
  context.addInitializer(function (): void {
    const { name } = context
    const metadata = this.constructor[TableService.PREFIX]
    if (metadata) metadata[KEY_OF_PARTITIONKEY] = name
  })
}
