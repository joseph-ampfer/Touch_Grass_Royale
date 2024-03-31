export default function hoursUntilMidnight() {
    const now = new Date(); // The current moment
    const midnight = new Date(now); // Copy now to start with
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
  
    // Calculate the difference in hours
    const diff = (midnight - now) / (1000 * 60 * 60); // Convert milliseconds to hours
  
    return Math.floor(diff);
  }
    