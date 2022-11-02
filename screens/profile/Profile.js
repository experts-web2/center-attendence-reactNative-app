import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
// import notifee from '@notifee/react-native';
import {getAttendance} from '../../services/attendaceService';
import {Notification, Notifications} from 'react-native-notifications';
import moment from 'moment';
import {useEffect, useState} from 'react';
import AsyncStorageManager from '../../Managers/AsyncStorageManager';
import {ProgressChart} from 'react-native-chart-kit';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import i18n from '../../services/i18';

const initI18n = i18n;

const data = {
  labels: ['Attendences', 'Absent', 'Total '],
  data: [0.4, 0.6, 0.8],
};
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Profile = ({navigation}) => {
  const isFocused = useIsFocused();
  const {t, i18n} = useTranslation();
  const [attendances, setAttendances] = useState([]);
  const [attendanceFilters, setAttendanceFilters] = useState({
    city: null,
    center: null,
  });
  const getAllAttendencesData = async () => {
    await getAttendance(attendanceFilters)
      .then(response => {
        console.log('response', response);
        setAttendances(response.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    AsyncStorageManager.getDataObject('user').then(res => {
      console.log('res', res);
    });
    getAllAttendencesData();
  }, [isFocused]);
  const LogOutUser = async () => {
    await AsyncStorageManager.clearAllAsyncData();
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View style={styles.mainProfilePage}>
        <View style={styles.userProfileContainer}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
            <Image
              style={styles.userProfile}
              source={require('../../assets/images/user.jpg')}
            />
          </LinearGradient>
        </View>
        <Image
          style={styles.userProfileabsolute}
          source={require('../../assets/images/user.jpg')}
        />
        <View style={styles.userProfileChart}>
          <ProgressChart
            data={data}
            width={Dimensions.get('window').width}
            height={150}
            strokeWidth={8}
            radius={22}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
        <TouchableOpacity style={{padding: 10}}>
          <Button
            title="Logout"
            style={{padding: 10, borderWidth: 2, borderRadius: 10}}
            onPress={LogOutUser}
          />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.divCreator}>
            <FlatList
              data={attendances}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <View style={styles.userContainer}>
                    <View style={styles.userDetail1}>
                      <Text style={styles.userName}>City:</Text>
                      <Text style={styles.userEmail}>{item.city.name}</Text>
                    </View>
                    <View style={styles.userDetail}>
                      <Text style={styles.userName}>Center:</Text>
                      <Text style={styles.userEmail}>{item?.center.name}</Text>
                    </View>
                    <View style={styles.userDetail}>
                      <Text style={styles.userName}>City Manager:</Text>
                      <Text style={styles.userEmail}>
                        {item.cityManager.map((items, index) => {
                          return index === item.cityManager.length - 1
                            ? items
                            : items + ',';
                        })}
                      </Text>
                    </View>
                    <View style={styles.userDetail}>
                      <Text style={styles.userName}>Center Manager:</Text>
                      <Text style={styles.userEmail}>
                        {item.centerManager.map((items, index) => {
                          return index === item.centerManager.length - 1
                            ? items
                            : items + ',';
                        })}
                      </Text>
                    </View>
                    <View style={styles.userDetail}>
                      <Text style={styles.userName}>new Member:</Text>
                      <Text style={styles.userEmail}>{item?.newMembers}</Text>
                    </View>
                    <View style={styles.userDetail}>
                      <Text style={styles.userName}>Non Member:</Text>
                      <Text style={styles.userEmail}>{item.nonEmployees}</Text>
                    </View>
                    <View style={styles.userDetail2}>
                      <Text style={styles.userName}>Dated:</Text>
                      <Text style={styles.userEmail}>
                        {moment(item?.date).format('MMM Do YY')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  userProfileContainer: {
    height: 150,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProfile: {
    height: 150,
    width: '100%',
  },
  userProfileabsolute: {
    height: 100,
    width: 100,
    borderRadius: 75,
    position: 'absolute',
    top: 80,
    left: 20,
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
  userInfo: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  divCreator: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    border: 1,
    borderRadius: 5,
  },
  userDetail1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
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
  userCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  headerTextStyle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  userProfileSomeSpace: {
    marginTop: 10,
    borderRadius: 5,
  },
  userProfileChart: {
    width: '80%',
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 5,

    marginRight: 20,
  },
  mainProfilePage: {
    backgroundColor: '#F8FAF8',
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
});
