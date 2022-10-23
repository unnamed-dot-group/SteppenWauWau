import {
  DynamoDBClient,
  DescribeTableCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-1" });

async function getTableKeySchema(tableName) {
  const command = new DescribeTableCommand({ TableName: tableName });
  const response = await client.send(command);
  const schema = response.Table.KeySchema;
  return {
    hash: schema.find((key) => key.KeyType === "HASH").AttributeName,
    range: schema.find((key) => key.KeyType === "RANGE")?.AttributeName,
  };
}

export async function getItem(table, hashKey, rangeKey) {
  const { hash, range } = await getTableKeySchema(table);
  const command = new GetItemCommand({
    TableName: table,
    Key: {
      [hash]: { S: hashKey },
      [range]: { S: rangeKey },
    },
  });
  const response = await client.send(command);
  return response.Item;
}
