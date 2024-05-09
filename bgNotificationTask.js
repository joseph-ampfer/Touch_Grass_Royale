import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
    console.log('Recieved a notification in the background!');
    if (error) {
        console.error(error);
        return;
    }

    console.log("This is from TaskManager ====== ",JSON.stringify(data, null, 2));
    // Do something with the data
    console.log(data?.request?.content?.data)
    if (data?.request?.content?.data?.type === 'background-update') {
        print("THIS IS A BACKGROUND UPDATE")
    }
});

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);


