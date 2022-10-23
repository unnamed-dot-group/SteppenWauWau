import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import log from "../lib/log.js";
import { EmbedBuilder } from "discord.js";

const dynamodb = new DynamoDBClient({
  region: "eu-west-1",
});

export default async function profile(interaction) {
  log(`Showing profile for ${interaction.user.id}`);

  const result = await dynamodb.send(
    new GetItemCommand({
      TableName: "steppenwauwau-member-profiles",
      Key: {
        DiscordUserId: {
          S: interaction.user.id,
        },
      },
    })
  );

  console.log(`url: ${interaction.user.avatarURL()}`);

  const mundane_currency = result.Item.MundaneCurrency.N;

  const embed = new EmbedBuilder();
  embed.setTitle(`${interaction.user.username}'s Profile`);
  embed.setThumbnail(interaction.user.avatarURL());
  embed.addFields({
    name: "MundaneCurrency",
    value: mundane_currency,
  });

  await interaction.reply({ embeds: [embed] });
}
