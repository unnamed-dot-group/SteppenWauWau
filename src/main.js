import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import ActivityType from "./helpers/ActivityType.js";
import profile from "./commands/profile.js";
import { LogEvent } from "./lib/events.js";
import setRandomActivity from "./lib/setRandomActivity.js";
import addMemberMundaneCurrency from "./lib/addMemberMundaneCurrency.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  presence: {
    activities: [
      {
        type: ActivityType.LISTENING,
        name: "my boot logs",
      },
    ],
  },
});

client.on("ready", async () => {
  LogEvent({
    type: "ready",
  });

  await setRandomActivity(client);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  await addMemberMundaneCurrency(message.author.id, 1);
});

client.on("guildMemberAdd", async (member) => {
  // send welcome message
  client.channels.fetch(process.env.WELCOME_CHANNEL_ID).then((channel) => {
    channel.send(`Welcome to the server, ${member}!`);
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "profile") await profile(interaction);
});

client.login(process.env.DISCORD_BOT_TOKEN);
