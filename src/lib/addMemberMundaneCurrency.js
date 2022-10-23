import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import config from "../config.js";

const dynamodb = new DynamoDBClient({
  region: config.aws.region,
});

export default async function updateMemberCurrency(discordUserId, value) {
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
