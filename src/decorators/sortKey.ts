import { TableService } from "../sugar/guts/TableService"

export const KEY_OF_SORTKEY: string = 'sortKey'

/**
 * An attribute marked as ignored will not be persisted.
 */
export function sortKey(originalMethod: any, context: ClassFieldDecoratorContext): void {
  context.addInitializer(function (): void {
    const { name } = context
    const metadata = this.constructor[TableService.PREFIX]
    if (metadata) metadata[KEY_OF_SORTKEY] = name
  })
}
