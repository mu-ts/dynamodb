import { expect } from 'chai';
import { suite, test } from '@testdeck/mocha';

import { table } from '../../src/decorators/table';
import { deleteItem } from '../../src/commands/deleteItem';
import { Client } from '../../src/guts/Client';
import { MockClient } from '../mock/MockClient';

@suite
export class DeleteObjectSpec {

  @test
  public async noVersionByBucket(): Promise<void> {
    @table('some-buket')
    class User{
      public id: string = 'user-1';
    }

    Client.instance = () => new MockClient({ VersionId: undefined } as any) as any as Client;
    expect(async () => await deleteItem(User, 'user-1')).to.not.throw();
    
  }
}
