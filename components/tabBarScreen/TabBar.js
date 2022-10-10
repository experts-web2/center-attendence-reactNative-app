import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../../screens/home/Home';
import Profile from '../../screens/profile/Profile';
import AttendanceTableForm from '../../screens/attendance/AttendanceTableForm';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const TabBar = () => {
  return (
    <Tab.Navigator
    // set the initial tab to be displayed
    
      initialRouteName="Home"
      id="TabBar"
      // detachInactiveScreens={true}
      // screenListeners={{
      //   tabPress: (e) => {
      //     console.log('tabPress', e);
      //     // Prevent default action
      //     e.preventDefault();
      //   },

      //   focus: () => {
      //     console.log('focus');
      //   // set initial tab

      //   }
      // }}
      screenOptions={({route}) => ({
      
        
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'attendanceForm') {
            iconName = focused ? 'cog' : 'cog';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    
      >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="attendanceForm" component={AttendanceTableForm} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default TabBar;




// screenOptions={TabBarScreenStyleOptions}
// initialRouteName="Home"
// >
// {TabBarScreenOptions.map(({name, component, iconName}) => (
//   <Tab.Screen

//   onPress={()=>console.log('clicked')}
//     key={name}
//     name={name ? name : null}
//     component={component}
//     options={{
//       style: {backgroundColor: 'red', paddingTop: 20},
//       tabBarIcon: ({color, size, border}) =>
//         iconName === 'plus' ? (
//           <Icon
//             name={iconName}
//             style={{
//               color: 'black',
//               fontSize: 25,
//               borderWidth: 2,
//               display: 'flex',
//               justifyContent: 'center',
//               alignSelf: 'center',
//               alignItems: 'center',
//               borderColor: 'black',
//               borderRadius: 10,
//               padding: 6,
//             }}
//           />
//         ) : (
//           <Icon
//             name={iconName}
//             style={{color: 'black', fontSize: 25, padding: 5}}
//           />
//         ),
//     }}
//   />
// ))}
//     </Tab.Navigator>
//   );
// };

// export default TabBar;

const styles = StyleSheet.create({});
