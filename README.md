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

## Client

There is a singleton that wraps the Client which you can use to reconfigure the client should you need to do so.

```
Client.instance().configure();
```

## Command Functions

Get an item.

```
import { getItem } from '@mu-ts/dynamodb';

const user: User = await getItem(User, 'timmy', 36);
```

Put an item.

```
import { putItem } from '@mu-ts/dynamodb';

const user: User = await putItem(User, 'timmy', 36);

```

Delete an item.

```
import { deleteItem } from '@mu-ts/dynamodb';

await deleteItem(User, 'timmy', 36);
```

Update an item uses the PutItem command which only updates specific attributes, for a record matching the corresponding hash key. If no hash key matches then a new item is created.

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