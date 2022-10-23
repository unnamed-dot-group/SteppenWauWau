import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import log from "./log.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function transaction(
  source,
  target,
  currency,
  value,
  reason
) {
  log(`Transaction from ${source} to ${target} for ${value} ${currency}`);

  await dynamodb.send(
    new PutItemCommand({
      TableName: "steppenwauwau-transactions",
      Item: {
        Epoch: {
          S: Date.now().toString(),
        },
        Origin: {
          S: source,
        },
        Target: {
          S: target,
        },
        Currency: {
          S: currency,
        },
        Value: {
          N: value.toString(),
        },
        Reason: {
          S: reason,
        },
      },
    })
  );
}
