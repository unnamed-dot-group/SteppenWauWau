import { putItem } from "./dynamodb.js";

export default async function LogEvent(data) {
  await putItem("steppenwauwau-events", {
    Epoch: `${Date.now().toString()}-${Math.random().toString().slice(2, 6)}`,
    Data: data,
  });
}
