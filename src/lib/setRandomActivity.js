import ActivityType from "../helpers/ActivityType.js";
import log from "./log.js";

export default async function setRandomActivity(discordClient) {
  const activities = [
    {
      type: "LISTENING",
      name: "to enemy comms",
    },
  ];

  const activity = activities[Math.floor(Math.random() * activities.length)];

  log(`Setting activity to "${activity.type} ${activity.name}"`);

  await discordClient.user.setActivity(activity.name, {
    type: ActivityType[activity.type],
  });
}
