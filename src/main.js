import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import debug from "./commands/debug.js";
import addMemberCash from "./lib/addMemberCash.js";
import log from "./lib/log.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", async () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  addMemberCash(message.author.id, 1, "message sent");
});

client.on("guildMemberAdd", async (member) => {
  // send welcome message
  client.channels.fetch(process.env.WELCOME_CHANNEL_ID).then((channel) => {
    channel.send(`Welcome to the server, ${member}!`);
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "debug") await debug(interaction);
});

client.login(process.env.DISCORD_BOT_TOKEN);
