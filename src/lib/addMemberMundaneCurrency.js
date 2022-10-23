import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { LogEvent } from "./events.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function updateMemberCurrency(discordUserId, value) {
  LogEvent({
    type: "updateMemberCurrency",
    discordUserId,
    value,
  });

  await dynamodb.send(
    new UpdateItemCommand({
      TableName: "steppenwauwau-members",
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
