import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';
import {deviceTokenAndAuthorization} from './utils/notificatios';


const App = () => {
  useEffect(() => {
    deviceTokenAndAuthorization();
  }, []);
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