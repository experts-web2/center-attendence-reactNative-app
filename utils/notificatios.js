import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const deviceTokenAndAuthorization = async () => {
  const token = await messaging().getToken();
  console.log('token device', token);
  const authPermission = await messaging().requestPermission();
  const isEnabled =
    messaging.AuthorizationStatus.AUTHORIZED ||
    messaging.AuthorizationStatus.PROVISIONAL;
  if (authPermission && isEnabled) {
    console.log('Permission Granted');
  } else {
    console.log('Permission Denied');
  }
};


export const createChannel= PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'My channel',
    channelDescription: 'A channel to categorise your notifications',
    playSound: true,
    soundName: 'default',
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);
