import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';
import {deviceTokenAndAuthorization} from './utils/notificatios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';


const App = () => {
  useEffect(()=>{
    deviceTokenAndAuthorization();
    const unsubscribe=messaging().
    onMessage(async remoteMessage => {
      PushNotification.createChannel(
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
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
        vibrate: true,
      });
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  },[])
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <ScreenNavigations />
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({});

export default App;
