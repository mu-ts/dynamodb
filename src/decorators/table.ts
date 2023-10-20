import { TableService } from "../sugar/guts/TableService"

/**
 * Used to mark a class to store its instances in a specific bucket.
 * 
 * @param name of the bucket for a class to persist its objects within.
 * @returns 
 */
export function table(name: string): any {
  return function bucketDecorator(target: any, context: ClassDecoratorContext): typeof Function | void {
    context.addInitializer(function (this: any) {
      this[TableService.PREFIX] = this[TableService.PREFIX] ? this[TableService.PREFIX].table = name : { table: name }
      /**
       * Creating an instance of the underlying class ensures that the field
       * and attribute level decorators will get picked up.
       */
      new this()
    })
  }
}
  