import { expect } from 'chai';
import { suite, test } from '@testdeck/mocha';

import { table } from '../../src/decorators/table';
import { TableRegistry } from '../../src/guts/TableRegistry';

@suite
export class TableSpec {
  @test
  public decorate(): void {
   
    @table('test')
    class User {}

    const bucketName: string = TableRegistry.instance().getTableName(User);

    expect(bucketName).to.equal('test');
  }

}
