import AttendanceTableForm from '../screens/attendance/AttendanceTableForm';
import AttendenceChart from '../screens/charts/AttendenceChart';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import Users from '../screens/users/Users';

export const TabBarScreenOptions = [
  {
    name: 'Home',
    component: Home,
    iconName: 'home',
  },
  {
    name: 'address',
    component: AttendanceTableForm,
    iconName: 'plus',
  },
  {
    name: 'Profile',
    component: Profile,
    iconName: 'user',
  },
  {
    name: 'Charts',
    component: AttendenceChart,
    iconName: 'chart-bar',
  },
  
];

export const TabBarScreenStyleOptions = {
  headerShown: false,
  tabBarStyle: {backgroundColor: 'white', height: 60},
  tabBarLabelStyle: {fontSize: 15},
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'red',
  tabBarIconStyle: {color: 'white', fontSize: 20, marginTop: 5},
};
