import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import debug from "./commands/debug.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "debug") await debug(interaction);
});

client.login(process.env.DISCORD_BOT_TOKEN);
