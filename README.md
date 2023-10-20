# Objective

Nice sugarry layer over top of DynamoDB to make utilizing it quitea bit cleaner. Uses @aws-sdk library which is more moduarlized so your deploy sizes should be smaller.

This class also makes use of @mu-ts/serialization for some convenience behaviors while working with objects, like field encoding/encryption and uuid generation.

# Class Decoration

Pretty straight forward, for any class you want associated to a table, decorate with @table. The first argument is the table name, the remaining arguments are the keys that make up the hash key for the table.

This example shows a composite key, as do the examples throughout, but to do a signle key you would just use a single attribute.

```
import { table } from '@mu-ts/dynamodb';

@serializable
@table(process.env.USER_TABLE_NAME)
class User {

  @primaryKey
  name: string;

  @sortKey
  age: number;

  @encode('hex')
  group?: string;

}
```
## Command Functions

A handful of utilities for the common cases. Want more, create a merge request with your implementation.

### Get an item.

```
import { getItem } from '@mu-ts/dynamodb';

const timmy: User = new User();
user.name = 'timmy'

const user: User = await getItem(timmy);

// or if no object.
const user: User = await getItem({name: 'timmy'}, 'the-table');
```

### Put an item.

```
import { putItem } from '@mu-ts/dynamodb';

const timmy: User = new User();
user.name = 'timmy'
user.age = 15
user.group = 'super special'

const user: User = await putItem(user);

```

### Delete an item.

```
import { deleteItem } from '@mu-ts/dynamodb';

const timmy: User = new User();
user.name = 'timmy'
user.age = 15
await deleteItem(timmy);

// or if no object
await deleteItem({name: 'timmy', age: 15}, 'table-to-delete-from');
```

### Update an item 

Uses the PutItem command which only updates specific attributes, for a record matching the corresponding hash key. If no hash key matches then a new item is created.

The value returned is a merging together of the values passed in as well as the old values returned back from DynamoDB.

```
import { updateItem } from '@mu-ts/dynamodb'

let user: User = new User()
user.name = 'john'
user.age = 46
user.group = 'blue'

user = await updateItem(user)

```
