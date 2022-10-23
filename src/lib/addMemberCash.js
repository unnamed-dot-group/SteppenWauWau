import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function addMemberCash(discordUserId, value) {
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
