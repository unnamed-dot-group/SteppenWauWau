import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import log from "./log.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function addMemberMundaneCurrency(
  discordUserId,
  value,
  reason
) {
  await dynamodb.send(
    new UpdateItemCommand({
      TableName: "steppenwauwau-member-profiles",
      Key: {
        DiscordUserId: {
          S: discordUserId,
        },
      },
      UpdateExpression: "ADD MundaneCurrency :value",
      ExpressionAttributeValues: {
        ":value": {
          N: value.toString(),
        },
      },
    })
  );
}
