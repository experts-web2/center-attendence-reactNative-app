import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Surface} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Tab_MyFilters} from '../../assets/images';
import moment from 'moment';
import {getAttendance, getCenterNmae} from '../../services/attendaceService';
import messaging from '@react-native-firebase/messaging';
import Filteration from '../attendance/Filteration';
import {Dimensions} from 'react-native';
import AsyncStorageManager from '../../Managers/AsyncStorageManager';
import {deviceTokenAndAuthorization} from '../../utils/notificatios';
import { updateUserInfo } from '../../services/AuthService';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Animated, {
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import DropDown from 'react-native-paper-dropdown';

import {languageList} from './../../constants/applicationStaticData';

const Home = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });
  const isFocused = useIsFocused();
  const [userRole, setUserRole] = useState('');
  const [role, setRole] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [userRoleName, setUserRoleName] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [userId,setUserId] = useState('');
  const [attendanceFilters, setAttendanceFilters] = useState({
    center: null,
    city: null,
  });
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(4);
  const [language, setLanguage] = useState('en');

  const getAllAttendencesData = async () => {
    await getAttendance({userRole, offset, limit})
      .then(response => {
        setAttendances(response.data);
      })
      .catch(err => console.log(err));
  };

  const handleNextItems = async () => {
    setoffset(offset + 1);
  };

const setUserToken=async()=>{
  const userData=await updateUserInfo(userId,await messaging().getToken());
  console.log("userdata called",userData);
}

  useEffect(() => {
    getAttendance({userRole, offset})
      .then(response => {
        setAttendances(response.data);
        setUserToken();
      })
      .catch(err => console.log(err));
  }, [offset]);

  useEffect(() => {
   
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      });

    AsyncStorageManager.getDataObject('user')
      .then(response => {
        setUserRole(response.center[0]);
        setRole(response.role);
        console.log('userRole', response._id);
        setUserId(response._id);
        getCenterNmae(response.center[0]).then(response => {});
      })
      .then(res => {
        getAllAttendencesData();
        setUserToken();
        
      });
    if (isFocused) {
      AsyncStorageManager.getDataObject('user')
        .then(response => {
          setUserRole(response.center[0]);
          setRole(response.role);
          setUserId(response._id);
          console.log('userRole', response._id);
          getCenterNmae(response.center[0]).then(response => {
            setUserRoleName(response.data.name);
          });
        })
        .then(res => {
          getAllAttendencesData();
          setUserToken();
        });
    }
  }, [isFocused, userRole]);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <View style={styles.homeWrapper}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTextStyle}>{t('All Attendences')}</Text>
      </View>
      <View>
        <View style={styles.mainFilterIcon}>
          <TouchableOpacity
            style={styles.filterIcon}
            onPress={() => setShowFilter(!showFilter)}>
            <Image source={Tab_MyFilters} style={styles.filterIconImage} />
            <Text style={styles.filterIconText}>{t('filter')}</Text>
          </TouchableOpacity>
          <Surface style={styles.containerStyle}>
            <DropDown
              dropDownContainerMaxHeight={100}
              dropDownContainerHeight={100}
              dropDownStyle={{height: 100}}
              label={'Language'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={language}
              setValue={setLanguage}
              list={languageList}
            />
          </Surface>
        </View>
        <View>
          <Text
            style={{
              fontSize: 24,
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'left',
              marginLeft: 20,
            }}>
            {t(userRoleName)}
          </Text>
        </View>
        <Modal visible={showFilter} transparent={true}>
          <View style={{width: 100, height: 700}}>
            <Filteration
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              setAttendances={setAttendances}
            />
          </View>
        </Modal>
      </View>
      <View style={styles.divCreator}>
        <FlatList
          data={attendances}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdateAttendence', {item: item});
              }}>
              <Animated.ScrollView
                onScroll={scrollHandler}
                style={styles.animationattendanceCard}
                key={index}
                layout={Layout.springify()}>
                <View style={styles.userContainer}>
                  <View style={styles.userDetail2}>
                    <Text style={styles.userName}>{t('Dated')}:</Text>
                    <Text style={styles.userEmail}>
                      {moment(item?.date).format('MMM Do YY')}
                    </Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userName}>{t('New Member')}:</Text>
                    <Text style={styles.userEmail}>{item?.newMembers}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userName}>{t('City Manager')}:</Text>
                    <Text style={styles.userEmail}>
                      {item?.cityManager?.map((items, index) => {
                        return index === item?.cityManager?.length - 1
                          ? items
                          : items + ',';
                      })}
                    </Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userName}>{t('Center Manager')}:</Text>
                    <Text style={styles.userEmail}>
                      {item?.centerManager?.map((items, index) => {
                        return index === item?.centerManager?.length - 1
                          ? items
                          : items + ',';
                      })}
                    </Text>
                  </View>
                </View>
              </Animated.ScrollView>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleNextItems}>
          <View style={styles.designNextButton}>
            <Text style={{textAlign: 'center'}}>{t('Next')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  containerStyle: {
    width: '20%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 12,
    elevation: 4,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  homeWrapper: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    height: '100%',
    width: Dimensions.get('window').width,
    paddingBottom: 100,
  },
  divCreator: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    border: 1,
    borderRadius: 5,
    paddingBottom: 70,
  },
  flatList1: {
    border: 1,
    borderRadius: 5,
  },
  userContainer: {
    justifyContent: 'space-between',
    marginTop: 7,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0,
    justifyContent: 'space-between',
    width: '100%',
    color: '#000',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: '10 10 10 rgba(10, 10, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  userEmail: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  userPhone: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  userCity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  userDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    paddingVertical: 3,
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
  },
  userDetail1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
  },
  userDetail2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerTextStyle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    backgroundColor: '#334FE5',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 15,
    textAlign: 'center',
  },

  showRecoed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    margin: 10,
  },
  textStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIconImage: {
    width: 30,
    height: 30,
  },
  filterIconText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
  userCenter: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  mainFilterIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  animationattendanceCard: {
    transform: [{translateY: 0.5}],
    opacity: 0.5,
    transform: [{translateY: 0.5}],
    transform: [{translateX: 0.5}],
  },
  designNextButton: {
    backgroundColor: '#334FE5',
    width: '20%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    display: 'flex',
    borderRadius: 5,
    position: 'absolute',
    right: 150,
    bottom: -12,
  },
});

{
  /* <View style={styles.userDetail1}>
                  <Text style={styles.userName}>City:</Text>
                  <Text style={styles.userEmail}>{item.city.name}</Text>
                </View> */
}
{
  /* <View style={styles.userDetail}>
                  <Text style={styles.userName}>Center:</Text>
                  <Text style={styles.userEmail}>{item?.center.name}</Text>
                </View> */
}
{
  /*
                <View style={styles.userDetail}>
                  <Text style={styles.userName}>Non Member:</Text>
                  <Text style={styles.userEmail}>{item.nonEmployees}</Text>
                </View> */
}

// const socket = SocketIOClient('http://192.168.18.25:3000', {
//   jsonp: false,
//   transports: ['websocket'],
// });
// socket.on('connect', () => {
//   console.log('socket connetcted connected');
// });

// socket.on('notification', data => {
//   console.log('data of sockets is given ', data);
//   PushNotification.localNotification({
//     playSound: true,
//     channelId: 'channel-id',
//     title: 'New Attendance',
//     message: 'New Attendance has been added',
//     data: data,
//   });
// });
// PushNotification.configure({
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//   },
//   onNotification: function (notification) {
//     console.log('LOCAL NOTIFICATION ==>', notification);
//     navigation.navigate('notification', {data: notification.data});
//   },
//   requestPermissions: Platform.OS === 'ios',
// });
// if (role === '630e22da936b4c901f78dc2d') {
//   PushNotification.createChannel(
//     {
//       channelId: 'channel-id',
//       channelName: 'My channel',
//       channelDescription: 'A channel to categorise your notifications',
//       playSound: true,
//       soundName: 'default',
//       vibrate: true,
//     },
//     created => console.log(`createChannel returned '${created}'`),
//   );
// }
// import io from 'socket.io-client';
// import {mySocket} from '../../services/AuthService';
// import SocketIOClient from 'socket.io-client/dist/socket.io.js';
