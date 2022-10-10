//Import React
import React, {Component} from 'react';

// import { Tab_Home, Tab_MyFilters, Tab_CurrentSales, Tab_SalesClicked, Tab_Profile } from '../../assets/Images';
import {Tab_Home, Tab_Profile,chart} from '../../assets/images';

import {
  Alert,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  DeviceEventEmitter,
  BackHandler,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AttendanceTableForm from '../../screens/attendance/AttendanceTableForm';
import Profile from '../../screens/profile/Profile';
import Home from '../../screens/home/Home';
import AttendenceChart from '../../screens/charts/AttendenceChart';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#334FE5',
        height: 90,
        justifyContent: 'center',
        marginBottom: -34,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1,
        },
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          console.log('Route.Key---->>>' + route.name);
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getImageName = () => {
          if (route.name === 'Home') {
            return Tab_Home;
          } else if (route.name === 'Add') {
            return Tab_Profile;
          } else if (route.name === 'Profile') {
            return Tab_Profile;
          }
          else if (route.name === 'Chart') {
            return Tab_Home;
          }
          
        };

        var selectedTabBackgroundColor = isFocused ? 'white' : 'white';

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              height: 90,
              marginTop: 0,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
                borderRadius: 30,
                marginTop: 10,
              }}>
              <Image
                source={getImageName()}
                resizeMode={'contain'}
                style={styles.tabIconStyle}
                tintColor={selectedTabBackgroundColor}
              />
            </View>
            <Text
              style={{
                color: selectedTabBackgroundColor,
                marginTop: 5,
                fontSize: 13,
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default class TabBarScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        console.log('ANDROID BACK PRESSEDD');
        return true;
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#232b54" barStyle="dark-content" />
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Add"
            component={AttendanceTableForm}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
             <Tab.Screen
            name="Chart"
            component={AttendenceChart}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#232b54',
  },
  borderBottomStyle: {
    marginTop: 2,
    position: 'absolute',
    height: 8,
    borderWidth: 1.5,
  },
  tabIconStyle: {
    height: 22,
    width: 22,
    // remove transparency from icon image
      

  },
});
