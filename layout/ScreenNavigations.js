import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AllScreens} from '../constants/ScreensOptions';
const Stack = createNativeStackNavigator();
const ScreenNavigations = () => {
  return (
    <Stack.Navigator initialRouteName="TabBar">
      {AllScreens.map(({name, component, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default ScreenNavigations;

