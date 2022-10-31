import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import {useTranslation} from 'react-i18next';
import i18n from "./services/i18";
const initI18n = i18n;
import {
  StyleSheet,
} from 'react-native';
import ScreenNavigations from './layout/ScreenNavigations';
const App = () => {
  // const {t, i18n} = useTranslation();
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
