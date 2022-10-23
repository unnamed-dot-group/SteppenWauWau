import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import ActivityType from "./helpers/ActivityType.js";
import profile from "./commands/profile.js";
import setRandomActivity from "./lib/setRandomActivity.js";
import addMemberMundaneCurrency from "./lib/addMemberMundaneCurrency.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  presence: {
    activities: [
      {
        type: ActivityType.WATCHING,
        name: "my boot logs",
      },
    ],
  },
});

client.on("ready", async () => {
  mainLoop();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  await addMemberMundaneCurrency(message.author.id, 1);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "profile") await profile(interaction);
});

client.login(process.env.DISCORD_BOT_TOKEN);

function mainLoop() {
  setRandomActivity(client);
  setTimeout(mainLoop, 1000 * 60 * 5);
}
