import { queryAndAggregateUsageStats } from "@brighthustle/react-native-usage-stats-manager";

const now = new Date();
export const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));
export const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
export const timezone = new Intl.DateTimeFormat([], { timeZoneName: 'short' }).formatToParts(end).find(part => part.type === 'timeZoneName').value;

export const calculatePoints = async () => {
    
    const now = new Date(); 

    let start, end;

    // Start at 0:00 UTC and end the next day at 0:00 UTC
    start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0));

    //console.log("Start:", start); // This should correctly print the start time in ISO format
    //console.log("End:", end); 



    // Call function to get stats
    const result = await queryAndAggregateUsageStats(
      start.getTime(), 
      end.getTime()
    );
    //console.log(JSON.stringify(result, null, 2));
    //console.log(start.getTime())
    //console.log(end.getTime())

    // Loop over result and get total minutes (exclude Touch Grass Royale ;))
    let newtotal = 0;
    for (let key in result) {
      if (result[key]['appName'] != 'Touch Grass Royale' && result[key]['lastTimeUsed'] >= start.getTime()) {
        newtotal += result[key]['totalTimeInForeground']
        //console.log(result[key]['appName'])
        //console.log(result[key]['totalTimeInForeground']/60, 'minutes \n .')
      }
    }
    const minutesScreenTime = newtotal/60

    const nowUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
    //const now = new Date();
    const elapsedMilliseconds = nowUtc - start;
    const possiblePoints = (elapsedMilliseconds / 60000)
  
    // ACTUAL POINTS
    const actualPoints = possiblePoints - minutesScreenTime
    const rounded = Math.floor(actualPoints)
    //console.log('rounded: ', rounded)

    if (rounded < 0) {
        return 0;
    } else {
        return rounded;
    }

    //return rounded;
}