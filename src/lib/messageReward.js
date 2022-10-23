import addMemberMundaneCurrency from "./addMemberMundaneCurrency.js";

export default async function messageReward(discordUserId) {
  await addMemberMundaneCurrency(discordUserId, 1, "message sent");
}
