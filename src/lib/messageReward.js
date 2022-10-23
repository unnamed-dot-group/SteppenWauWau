import addMemberMundaneCurrency from "./addMemberMundaneCurrency.js";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import transaction from "./transaction.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function messageReward(discordUserId) {
  // check if user has been rewarded in the last 5 minutes
  const queryResult = await dynamodb.send(
    new QueryCommand({
      TableName: "steppenwauwau-transactions",
      KeyConditionExpression:
        "Source = :source AND Target = :target AND Currency = :currency AND Epoch > :epoch",
      ExpressionAttributeValues: {
        ":source": {
          S: "system",
        },
        ":target": {
          S: discordUserId,
        },
        ":currency": {
          S: "MundaneCurrency",
        },
        ":epoch": {
          S: (Date.now() - 300000).toString(),
        },
      },
    })
  );

  if (queryResult.Items.length === 0) {
    transaction(
      "system",
      discordUserId,
      "MundaneCurrency",
      1,
      "message reward"
    );

    await addMemberMundaneCurrency(message.author.id, 1, "message sent");

    log(
      `Rewarding ${message.author.username}#${message.author.discriminator} with 1 Mundane Currency for sending a message`
    );
  } else {
    log(
      `User ${discordUserId} already received a reward in the last 5 minutes`
    );
  }
}
