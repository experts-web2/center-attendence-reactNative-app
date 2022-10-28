import TabBar1 from '../components/tabBarScreen/TabBar1'
import TabBar from '../components/tabBarScreen/TabBar';
import ChangePassword from '../screens/Auth/ChangePassword';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import Users from '../screens/users/Users';
import AttendenceChart from '../screens/charts/AttendenceChart';
import UpdateFormScreen from '../components/allScreens/UpdateFormScreen';
import AttendanceTableForm from '../screens/attendance/AttendanceTableForm';


export const AllScreens = [
  {
    name: 'Login',
    screen: 'Login',
    component: LoginScreen,
    options: {
      title: 'login',
      headerShown: false,
    },
  },
  {
    name: 'Register',
    screen: 'Register',
    component: SignUpScreen,
    options: {
      title: 'Register',
      headerShown: false,
    },
  },
  {
    name: 'Forget',
    screen: 'Forget',
    component: ForgetPassword,
    options: {
      title: 'Forget',
      headerShown: false,
    },
  },
  {
    name: 'Change_Password',
    screen: 'Change_Password',
    component: ChangePassword,
    options: {
      title: 'Change_Password',
      headerShown: false,
    },
  },

  {
    name: 'Profile',
    screen: 'Profile',
    component: Profile,
    options: {
      title: 'Profile',
      headerShown: false,
    },
  },
  {
    name: 'Home',
    screen: 'Home',
    component: Home,
    options: {
      title: 'Home',
      headerShown: false,
    },
  },
  {
    name: 'TabBar1',
    screen: 'TabBar1',
    component: TabBar1,
    options: {
      title: 'Home',
      headerShown: false,
    },
  },
  {
    name: 'Users',
    screen: 'Users',
    component: Users,
    options: {
      title: 'Users',
      headerShown: false,
    },
  },
  {
    name: 'Charts',
    screen: 'Charts',
    component: AttendenceChart,
    options: {
      title: 'Chart',
      headerShown: false,
    },
   
  },
  {
    name: 'UpdateAttendence',
    screen: 'UpdateAttendence',
    component: UpdateFormScreen,
    options: {
      title: 'UpdateAttendence',
      headerShown: false,
    },
  },
  {
    name: 'attendenceForm',
    screen: 'attendenceForm',
    component: AttendanceTableForm,
    options: {
      title: 'attendenceForm',
      headerShown: false,
    },
  },
 
];

