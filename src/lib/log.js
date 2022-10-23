import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function log(message, level = "log") {
  console[level](message);

  await dynamodb.send(
    new PutItemCommand({
      TableName: "steppenwauwau-logs",
      Item: {
        Epoch: {
          S: Date.now().toString(),
        },
        Level: {
          S: level,
        },
        Message: {
          S: message,
        },
      },
    })
  );
}
