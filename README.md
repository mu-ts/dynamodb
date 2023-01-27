# Objective

Nice sugarry layer over top of DynamoDB to make utilizing it quitea bit cleaner. Uses @aws-sdk library which is more moduarlized so your deploy sizes should be smaller.

# Class Decoration

Pretty straight forward, for any class you want associated to a table, decorate with @table. The first argument is the table name, the remaining arguments are the keys that make up the hash key for the table.

This example shows a composite key, as do the examples throughout, but to do a signle key you would just use a single attribute.

```
import { table } from '@mu-ts/dynamodb';

@table(process.env.USER_TABLE_NAME, name, age)
class User {

  name: string;

  age: number;

  group?: string;

}
```

## No Class No Problem

You can always use the `tableName('user', 'super-special-users')` helper to register a name you want to reference. ie, `getItem('users', 'user-id)`.

Alternatively, you can define the table name in your environment variables and then use the environment variable name as the key. `process.env.USERS_TABLE = 'morespecialer-users'` and then `getItem('USERS_TABLE', 'user-id)`.

In these cases each response is still 'de dynamo-ized' by converting AttributeValue's into their simple form. `hello: { S: 'world' }` becomes `hello: 'world'` for exmaple.

## Client

There is a singleton that wraps the Client which you can use to reconfigure the client should you need to do so.

```
Client.instance().configure();
```

## Command Functions

A handful of utilities for the common cases. Want more, create a merge request with your implementation.

### Query Items

You can use object fragments to create lazy queries where they apply.

```
import { query } from '@mu-ts/dynamodb';

const expression: User = {
  group: 'blue'
}
const users: User[] = await query(User, expression);
```

For complex conditions you can also pass in your own `QueryCommandInput` instance. _The table name will be added to the query command input passed in, even if you provide it._

```
import { QueryCommandInput } from '@aws-sdk/client-dynamodb';
import { query } from '@mu-ts/dynamodb';

const expression: QueryCommandInput = {
  Expression: "Thing > 100"
}
const users: User[] = await query(User, expression);
```

### Get an item.

```
import { getItem } from '@mu-ts/dynamodb';

const user: User = await getItem(User, 'timmy', 36);
```

### Put an item.

```
import { putItem } from '@mu-ts/dynamodb';

const user: User = await putItem(User, 'timmy', 36);

```

### Delete an item.

```
import { deleteItem } from '@mu-ts/dynamodb';

await deleteItem(User, 'timmy', 36);
```

### Update an item 

Uses the PutItem command which only updates specific attributes, for a record matching the corresponding hash key. If no hash key matches then a new item is created.

The value returned is a merging together of the values passed in as well as the old values returned back from DynamoDB.

```
import { updateItem } from '@mu-ts/dynamodb';

let user: User = new User();
user.name = 'john';
user.age = 46;
user.group = 'blue';

user = await updateItem(User, user);

```

## Send Directly

Get an item.

```
import { send, Client } from '@mu-ts/dynamodb';

const getCommand: GetItemCommand = new GetItemCommand({ ... })
const output: GetItemCommandOutput = await send(getCommand);

// OR, if you want to use the client directly


const output: GetItemCommandOutput = await Client.instance().send(getCommand);

```