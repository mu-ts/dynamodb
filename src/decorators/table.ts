import { TableRegistry } from '../guts/TableRegistry';

/**
 * Used to mark a class to store its instances in a specific bucket.
 * 
 * @param tableName to assign this class to.
 * @param idAttribute name, to use for resolving the ID value, or dynamo attribute name.
 * @returns 
 */
export function table(tableName: string, ...idAttributes: string[]): any {
  return (target: typeof Function): typeof Function | void => {
    TableRegistry.instance().register(target, { tableName, idAttributes });
    return target;
  };
}
  