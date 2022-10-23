import "dotenv/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";

const commands = [
  new SlashCommandBuilder()
    .setName("debug")
    .setDescription("Useless information for dumb developers"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_APPLICATION_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
