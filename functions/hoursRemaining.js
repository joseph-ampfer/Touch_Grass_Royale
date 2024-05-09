import { end } from "./calculatePoints";

export function hoursRemaining() {
  // current UTC
  const now = new Date();
  const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()))

  const diff = (end.getTime() - nowUTC.getTime()) / (1000 * 60 * 60);

  return Math.round(diff);
}
    