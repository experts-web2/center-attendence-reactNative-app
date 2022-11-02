import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';
import {Notification, Notifications} from 'react-native-notifications';
const App = () => {
  Notifications.registerRemoteNotifications();
  Notifications.events().registerRemoteNotificationsRegistered(event => {
    console.log('Notification token:', event.deviceToken);
  });
  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    event => {
      console.log('Notification error', event);
    },
  );
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
