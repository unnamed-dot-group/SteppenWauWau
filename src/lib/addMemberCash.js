import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import log from "./log.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function addMemberCash(discordUserId, value, reason) {
  log(`Adding ${value} to ${discordUserId} for ${reason}`);

  await dynamodb.send(
    new UpdateItemCommand({
      TableName: "steppenwauwau-member-profiles",
      Key: {
        DiscordUserId: {
          S: discordUserId,
        },
      },
      UpdateExpression: "ADD Cash :value",
      ExpressionAttributeValues: {
        ":value": {
          N: value.toString(),
        },
      },
    })
  );
}
