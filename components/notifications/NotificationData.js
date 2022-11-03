import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '../../services/i18';
const initI18n = i18n;
import {useNavigation} from '@react-navigation/native';

const NotificationData = props => {
  const [data, setData] = useState(props.route.params.data);
  console.log('props', props.route.params.data);
  const navigation = useNavigation();
  const {item} = props.route.params;
  const {t, i18n} = useTranslation();

  return (
    <>
      {console.log('item', item)}
      <View style={styles.homeWrapper}>
        <View style={styles.headerBackground}>
          <Text style={styles.headerTextStyle}>
            {t('Student Request Information')}
          </Text>
        </View>
        <Text
          onPress={() => {
            navigation.navigate('TabBar1');
          }}>
          NotificationData
        </Text>
        <View style={styles.userContainer}>
          <View style={styles.userDetail2}>
            <Text style={styles.userName}>{t('Dated')}:</Text>
            <Text style={styles.userEmail}>
              date
              {/* {moment(item?.date).format('MMM Do YY')} */}
            </Text>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{t('New Member')}:</Text>
            <Text style={styles.userEmail}>
              {/* {item?.newMember} */}
              {data?.newMembers}
            </Text>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{t('City Manager')}:</Text>
            <Text style={styles.userEmail}>
              {data?.cityManagers}
              {/* {item?.cityManager?.map((items, index) => {
                        return index === item?.cityManager?.length - 1
                          ? items
                          : items + ',';
                      })} */}
            </Text>
          </View>
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{t('Center Manager')}:</Text>
            <Text style={styles.userEmail}>
              {data?.centerManagers}
              {/* {item?.centerManager?.map((items, index) => {
                        return index === item?.centerManager?.length - 1
                          ? items
                          : items + ',';
                      })} */}
            </Text>
          </View>
        </View>
        <View styles={styles.flexPropertyInButton}>
          <TouchableOpacity style={styles.someButtonSpace}>
            <View style={styles.designNextButton}>
              <Text style={{textAlign: 'center'}}>{t('Approved')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.someButtonSpace}>
            <View style={styles.designNextButton1}>
              <Text style={{textAlign: 'center'}}>{t('Deny')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NotificationData;

const styles = StyleSheet.create({
  containerStyle: {
    width: '20%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 1,
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

    marginHorizontal: 12,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0,
    justifyContent: 'space-between',
    width: '95%',
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
  },
  animationattendanceCard: {
    transform: [{translateY: 0.5}],
    opacity: 0.5,
    transform: [{translateY: 0.5}],
    transform: [{translateX: 0.5}],
  },
  designNextButton: {
    backgroundColor: 'green',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  someButtonSpace: {
    paddingTop: 40,
    width: '100%',
    marginLeft: 130,
  },
  flexPropertyInButton: {
    flexDirection: 'column',
  },
  designNextButton1: {
    backgroundColor: 'red',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
