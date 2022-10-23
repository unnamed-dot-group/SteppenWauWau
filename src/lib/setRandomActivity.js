import ActivityType from "../helpers/ActivityType.js";
import { LogEvent } from "./events.js";

export default async function setRandomActivity(discordClient) {
  const activities = [
    {
      type: "LISTENING",
      name: "to enemy comms",
    },
  ];

  const activity = activities[Math.floor(Math.random() * activities.length)];

  LogEvent({
    type: "setRandomActivity",
    activity,
  });

  await discordClient.user.setActivity(activity.name, {
    type: ActivityType[activity.type],
  });
}
