import { test, suite } from '@testdeck/mocha';
import { expect } from 'chai';
import { TableRegistry } from '../../../src/guts/TableRegistry';

@suite
export class TableRegistrySpec {
 
  @test
  public register(): void {
    class TableRegistryClazz {
    }
    TableRegistry.instance().register(TableRegistryClazz, {tableName: 'test-Table-registry', idAttributes: ['id'] });
    expect(TableRegistry.instance().getTableName(TableRegistryClazz)).to.equal('test-Table-registry');
    expect(TableRegistry.instance().getIdAttributes(TableRegistryClazz)[0]).to.equal('id');
  }
}
