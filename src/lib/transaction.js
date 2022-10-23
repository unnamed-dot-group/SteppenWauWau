import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import log from "./log.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function transaction(from, to, currency, value, reason) {
  log(`Transaction from ${from} to ${to} for ${value} ${currency}`);

  await dynamodb.send(
    new PutItemCommand({
      TableName: "steppenwauwau-transactions",
      Item: {
        Epoch: {
          S: Date.now().toString(),
        },
        From: {
            S: from,
        },
        To: {
            S: to,
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
