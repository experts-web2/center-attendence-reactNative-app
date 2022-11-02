/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Notification, Notifications} from 'react-native-notifications';

AppRegistry.registerComponent(appName, () => App);
Notifications.registerRemoteNotifications();
Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
    console.log('Notification received in foreground: ', notification.payload);
    completion({alert: false, sound: false, badge: false});
  },
);

Notifications.events().registerRemoteNotificationsRegistered(event => {
  console.log('Device Token Received', event);
});
