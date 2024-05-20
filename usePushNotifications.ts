import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Linking, Platform } from "react-native";
import { sendPushTokenToServer, updatePoints } from "./apiFetches/fetches";
import { checkForPermission, queryAndAggregateUsageStats } from "@brighthustle/react-native-usage-stats-manager";
import { storage } from "./Storage";
import { calculatePoints } from "./functions/calculatePoints";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    let isGranted = true;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Notifications are used to to get messages from friends, and to get notified if you've won.");
        isGranted = false;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#2564eb",
        });
      }

      return {token, isGranted};
    } else {
      console.log("ERROR: Please use a phsyical device");
    }
  }

  return { expoPushToken, notification, registerForPushNotificationsAsync };
};






export const useBackgroundNotificationScheduler = () => {

    const silentNotificationListener = useRef<Notifications.Subscription>();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldShowAlert: true,
          shouldSetBadge: false,
        }),
      });

    const checkAndScheduleSilentNotif = async () => {
        const scheduledNotifs = await Notifications.getAllScheduledNotificationsAsync();
        if (scheduledNotifs.length === 0) {
          scheduleSilentBackgroundNotification();
        } else {
          console.log(scheduledNotifs);
        }
    }
    
    useEffect(() => {
        checkAndScheduleSilentNotif();

        silentNotificationListener.current =  
            Notifications.addNotificationReceivedListener((notification) => {
                //console.log(notification);
                if (notification?.request?.content?.data?.action == 'updatePoints') {
                    console.log('Update points here <<<<<<<');
                    updateFromSilentNotif();
                }
            })

        //return () => {
        //    Notifications.cancelAllScheduledNotificationsAsync();
        //};

    }, [])

    const scheduleSilentBackgroundNotification = () => {

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("silentUpdatePoints", {
              name: "silentUpdatePoints",
              importance: Notifications.AndroidImportance.MAX,
              enableLights: false,
              enableVibrate: false,
              showBadge: false,
              sound: null
            });
          }

        Notifications.scheduleNotificationAsync({
            content: {
                data: { action: "updatePoints" },
                priority: "max"
            },
            trigger: {
                channelId: 'silentUpdatePoints',
                hour: 23,
                minute: 55,
                repeats: true
            },
        });

    }
}






export const getPushPermissions = async () => {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
        return false
    }
    return true;
}




export const registerForPushAsync = async () => {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
            "Enable Notifications",
            "To recieve notifications, enable them in Settings and try again.",
            [
                { text: "Later", style: "cancel" },
                { text: "Open Settings", onPress: () => Linking.openSettings() }
            ],
            { cancelable: false }
        );
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#2564eb",
        });
      }

      try {
        await sendPushTokenToServer({push_token: token.data, push_enabled: true})
        return true;
      } catch (error) {
        throw error;
      }
    
    } else {
      console.log("ERROR: Please use a phsyical device");
    }
}





async function updateFromSilentNotif() {
    const access_token = storage.getString('access_token')
    if (!access_token) {
        console.log('No access token available.');
        return;
    }

    try {
        const hasPermission = await checkForPermission();
        if (!hasPermission) {
            console.log('No permission for usage stats.');
            return;
        }

        const points = await calculatePoints();
        if (points == null) {
            console.log('Failed to calculate points do to an error or no data');
            return;
        }

        const now = new Date();
        const updateResult = await updatePoints({ points: points, date: now.toISOString() });
        console.log('Points update successful from silentNotification');
        return;


    } catch (error) {
        console.error('Background fetch failed: ', error.detail)
        return;
    }
}


