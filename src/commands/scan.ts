import {
    ScanCommand,
    ScanCommandInput,
    ScanCommandOutput
} from '@aws-sdk/client-dynamodb';
import { Client } from '../guts/Client';
import { TableRegistry } from '../guts/TableRegistry';

/**
 *
 * @param table to execute a 'scan' on.
 * @param input
 */
export async function scan(input: ScanCommandInput, table?: Function | string): Promise<ScanCommandOutput> {
    if (!input.TableName && table) input.TableName = TableRegistry.instance().getTableName(table);

    return await Client.instance().send<ScanCommand, ScanCommandOutput>(new ScanCommand(input));
}
