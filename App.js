import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import {
  StyleSheet,
} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';
const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ScreenNavigations />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
});

export default App;
