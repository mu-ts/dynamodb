import { TableRegistry } from "../guts/TableRegistry"

/**
 * 
 * @param key to use going forward in referencing the table. If not found in the mappings
 *            then looked for within environment variables.
 * @param fullName of the table, to create a mapping for the table.
 * @return the name of the table.
 */
export const tableName = (key: string, tableName?: string): string  | undefined=> {
  if (tableName) {
    TableRegistry.instance().register(key, { tableName: key });
    return undefined;
  } else {
    let table: string | undefined = TableRegistry.instance().getTableName(key);
    if (!table) table = process.env[key];
    if (!table) table = key;
    return table!;
  }
}