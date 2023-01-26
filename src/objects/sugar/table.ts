import { TableRegistry } from "../../guts/TableRegistry"

/**
 * 
 * @param key to use going forward in referencing the table. If not found in the mappings
 *            then looked for within environment variables.
 * @param fullName of the table, to create a mapping for the table.
 * @return the name of the table.
 */
export const table = (key: string, tableName?: string): string => {
  let table: string = tableName;
  if (tableName) TableRegistry.instance().register(key, { tableName: table });
  else {
    table = TableRegistry.instance().getTableName(key);
    if (!table) table = process.env[key];
    if (!table) table = key;
  }
  return table;
}