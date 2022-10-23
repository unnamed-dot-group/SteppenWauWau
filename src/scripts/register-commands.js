import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "debug",
    description: "Useless information for dumb developers",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APPLICATION_ID,
        process.env.DISCORD_GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
