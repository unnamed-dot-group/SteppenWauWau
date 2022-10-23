import { getItem } from "../controllers/DynamoDB.js";
import { EmbedBuilder } from "discord.js";

export default async function profile(interaction) {
  const result = await getItem("steppenwauwau-members", interaction.user.id);

  // if user has no profile, tell them
  if (!result)
    return interaction.reply({
      content: "You have no profile yet. Be active in the server to get one!",
      ephemeral: true,
    });

  let mundane_currency = 0;

  if (result.Item.MundaneCurrency) {
    mundane_currency = result;
  }

  const embed = new EmbedBuilder();
  embed.setTitle(`${interaction.user.username}'s Profile`);
  embed.setThumbnail(interaction.user.avatarURL());
  embed.addFields({
    name: "Potatoes",
    value: `🥔 ${mundane_currency}`,
  });

  await interaction.reply({ embeds: [embed] });
}
