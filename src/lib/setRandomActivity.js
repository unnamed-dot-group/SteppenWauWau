import ActivityType from "../helpers/ActivityType.js";

export default async function setRandomActivity(discordClient) {
  const activities = [
    {
      type: "LISTENING",
      name: "enemy comms",
    },
  ];

  const activity = activities[Math.floor(Math.random() * activities.length)];

  await discordClient.user.setActivity(activity.name, {
    type: ActivityType[activity.type],
  });
}
