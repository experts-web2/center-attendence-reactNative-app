import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';

const App = () => {
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
