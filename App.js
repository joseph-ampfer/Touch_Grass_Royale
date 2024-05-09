import 'expo-dev-client';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation/appNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './firebaseConfig';
import { usePushNotifications, useBackgroundNotificationScheduler } from './usePushNotifications';
import './bgNotificationTask';
import { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from './backgroundFetch';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const client = new QueryClient();


export default function App() {

  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, null, 2);
  //console.log(data);
  // console.log('token: ', expoPushToken?.data);

  const cancelNotifs = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async function setUpBackgroundFetchAsync() {
    const isRegistered = await TaskManager.isTaskRegisteredAsync('background-fetch');
    if (!isRegistered) {
      await registerBackgroundFetchAsync();
    }
  }
  async function unregisterbgfetch() {
    await unregisterBackgroundFetchAsync();
  }
  useEffect(() => {
    unregisterbgfetch()
    setUpBackgroundFetchAsync();
    cancelNotifs();
  }, [])
  
  useBackgroundNotificationScheduler();
  
  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView style={{ flex:1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}


