import "dotenv/config";
import { Client, Intents } from "discord.js";
import debug from "./commands/debug";

const discord = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

discord.on("ready", async () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});

discord.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "debug") await debug(interaction);
});

discord.login(process.env.DISCORD_BOT_TOKEN);
