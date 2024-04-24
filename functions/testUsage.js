  // ===================FETCH USAGE STATS======================
  async function fetchUsageStats() {
    
    // Get current date
    const currentDate = new Date();

    // Set start time to beginning of the current day (00:00:00)
    const startOfDay = new Date(currentDate.setHours(0, 0 , 0, 0));

    // Set end time to the end of the current day (23:59:59)
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
  
    // Convert to milliseconds since UNIX epoch
    const startMilliseconds = startOfDay.getTime();
    const endMilliseconds = endOfDay.getTime();

    const events = await queryEvents(
      startMilliseconds,
      endMilliseconds
    );
  
    console.log('================================');
    console.log(JSON.stringify(events, null, 2));

    let total = 0;
    for (let key in events) {
      console.log(events[key]['name']);
      console.log(events[key]['humanReadableUsageTime']);
      total += events[key]['usageTime']
    };

    let minutesOnPhone = total/60000
    const now = new Date();
    const elapsedMilliseconds = now - startOfDay;
    const totalMinutes = (elapsedMilliseconds / 60000);
    const points = totalMinutes - minutesOnPhone

    console.log(total);
    console.log(Math.floor(minutesOnPhone), 'minutes of phone use');
    console.log(Math.floor(totalMinutes), 'minutes in day');
    console.log(Math.floor(points), 'total points');
  };
  
  //=============CALLING FETCH USAGE ON SCREEN MOUNT=========
  useEffect(() => {
  fetchUsageStats();
  // cleanup 
  }, []); // Empty dependency array means this effect runs only on component mount
