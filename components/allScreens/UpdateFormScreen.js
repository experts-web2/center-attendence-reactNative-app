import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
const UpdateFormScreen = props => {
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const {item} = props.route.params;

  useEffect(() => {
    console.log('-------------------------------------', item);
  });

  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate('Home');
        }}>
        UpdateFormScreen
        {item._id}
      </Text>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTextStyle}>User Detail</Text>
      </View>
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
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.navigate('attendenceForm');
        }}>
        <Text style={styles.loginButton1}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateFormScreen;

const styles = StyleSheet.create({
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

    // transform the card to the left and right when scrolling it
    transform: [{translateX: 0.5}],
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    backgroundColor: '#334FE5',
    height: 50,
    marginVertical: 10,
    marginLeft: 2,
    marginRight: 2,
    paddingHorizontal: 10,
  },
  loginButton1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    height: 50,
  },
  loginBtn: {
    fontSize: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
