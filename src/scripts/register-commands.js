import "dotenv/config";
import { REST, Routes } from "discord.js";
import config from "../config.js";

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_APPLICATION_ID,
      process.env.DISCORD_GUILD_ID
    ),
    {
      body: config.discord.commands,
    }
  );

  console.log("Successfully reloaded application (/) commands.");
})();
