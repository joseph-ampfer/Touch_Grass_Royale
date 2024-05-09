import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { storage } from "./Storage";
import {
    EventFrequency,
    checkForPermission,
    queryUsageStats,
    showUsageAccessSettings,
    queryEvents, 
    queryAndAggregateUsageStats
  } from '@brighthustle/react-native-usage-stats-manager';
import { updatePoints } from './apiFetches/fetches';
import { calculatePoints } from './functions/calculatePoints';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    console.log(`Background fetch initiated at: ${new Date().toISOString()}`);

    const access_token = storage.getString('access_token')
    if (!access_token) {
        console.log('No access token available.');
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    try {
        const hasPermission = await checkForPermission();
        if (!hasPermission) {
            console.log('No permission for usage stats.');
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }

        const points = await calculatePoints();
        if (points == null) {
            console.log('Failed to calculate points do to an error or no data');
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }

        const now = new Date()

        const updateResult = await updatePoints({ points: points, date: now.toISOString() });
        console.log('Points update successful from backgroundFetch');
        return BackgroundFetch.BackgroundFetchResult.NewData;


    } catch (error) {
        console.error('Background fetch failed: ', error.detail)
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});



// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 30, // 30 minutes
        stopOnTerminate: false, // android only
        startOnBoot: true, // android only
    });
}


// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}





TaskManager.defineTask("11:55_point_update", async () => {
    console.log('This is the 11:55 task -------------');
})

export async function register_11_55_async() {
    return BackgroundFetch.registerTaskAsync("11:55_point_update",{
        
    })
}