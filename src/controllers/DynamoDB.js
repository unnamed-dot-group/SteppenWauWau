import {
  DynamoDBClient,
  DescribeTableCommand,
  UpdateItemCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import config from "../config.js";

const dynamodb = new DynamoDBClient({
  region: config.aws.region,
});

export async function getItem(table, hashkey) {
  const hashkey_name = await getTableHashKeyName(table);

  const { Item } = await dynamodb.send(
    new GetItemCommand({
      TableName: table,
      Key: {
        [hashkey_name]: {
          S: hashkey,
        },
      },
    })
  );

  return awsItemToJson(Item);
}

export async function updateItem(table, hashkey, field, value) {
  const hashkey_name = await getTableHashKeyName(table);

  await dynamodb.send(
    new UpdateItemCommand({
      TableName: table,
      Key: {
        [hashkey_name]: {
          S: hashkey,
        },
      },
      UpdateExpression: "SET #field = :value",
      ExpressionAttributeNames: {
        "#field": field,
      },
      ExpressionAttributeValues: {
        ":value": {
          S: value,
        },
      },
    })
  );
}

export async function putItem(table, item) {
  await dynamodb.send(
    new PutItemCommand({
      TableName: table,
      Item: jsonToAwsItem(item),
    })
  );
}

async function getTableHashKeyName(table) {
  const { Table } = await dynamodb.send(
    new DescribeTableCommand({
      TableName: table,
    })
  );

  return Table.KeySchema.find((key) => key.KeyType === "HASH").AttributeName;
}

function jsonToAwsItem(json) {
  const item = {};
  for (const [key, value] of Object.entries(json)) {
    if (typeof value === "string") {
      item[key] = { S: value };
    } else if (typeof value === "number") {
      item[key] = { N: value.toString() };
    } else if (typeof value === "boolean") {
      item[key] = { BOOL: value };
    } else if (value === null) {
      item[key] = { NULL: true };
    } else if (Array.isArray(value)) {
      item[key] = { L: value.map((item) => jsonToAwsItem(item)) };
    } else if (typeof value === "object") {
      item[key] = { M: jsonToAwsItem(value) };
    }
  }
  return item;
}

function awsItemToJson(item) {
  const json = {};
  for (const [key, value] of Object.entries(item)) {
    if (value.S) {
      json[key] = value.S;
    } else if (value.N) {
      json[key] = Number(value.N);
    } else if (value.BOOL) {
      json[key] = value.BOOL;
    } else if (value.NULL) {
      json[key] = null;
    } else if (value.L) {
      json[key] = value.L.map((item) => awsItemToJson(item));
    } else if (value.M) {
      json[key] = awsItemToJson(value.M);
    }
  }
  return json;
}
