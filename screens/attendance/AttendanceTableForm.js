import {
  createAttendance,
  getUserRolesByCityCenter,
} from '../../services/attendaceService';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {getCities, getCentersByCity} from '../../services/AuthService';
import AsyncStorageManager from '../../Managers/AsyncStorageManager';
import { useIsFocused } from "@react-navigation/native";

const AttendanceTableForm = ({navigation}) => {
  const isFocused = useIsFocused();
  const [member, setmember] = useState('');
  const [nonMember, setnonMember] = useState('');
  const [city, setCity] = useState('choose');
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState();
  const [employee, setEmployee] = useState('');
  const [centerManagers, setCenterManagers] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [cityManagers, setCityManagers] = useState([]);
  const [selectCityManager, setSelectCityManager] = useState([]);
  const [selectCenterManager, setSelectCenterManager] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const handleCity = async e => {
    setCity(e);
    await getCentersByCity(e._id)
      .then(response => setCenters(response.data))
      .catch(err => console.log(err));
  };

  const handleCenterAndCityManagers = async (centerId, cityId) => {
    console.log("handleCenterAndCityManagers",centerId, cityId)
    await getUserRolesByCityCenter(centerId, cityId)
      .then(response => {
        console.log('response api call', JSON.stringify(response.data.cityManagers));
        setCenterManagers(
          response.data.centerManagers.map(item => {
            return {...centerManagers, label: item, value: item};
          }),
        );
        setCityManagers(
          response.data.cityManagers.map(item => {
            console.log('item', item);
            return {...cityManagers, label: item, value: item};
          }),
        );
      })
      .catch(err => console.log(err));
  };

  const selectCenter = async e => {
    setCenter(e);
    await getUserRolesByCityCenter(e._id, e.city._id)
      .then(response => {
        console.log('response of city managers', JSON.stringify(response.data.cityManagers));
        setCenterManagers(
          response.data.centerManagers.map(item => {
            return {...centerManagers, label: item, value: item};
          }),
        );
        setCityManagers(
          response.data.cityManagers.map(item => {
            return {...cityManagers, label: item, value: item};
          }),
        );
      })
      .catch(err => console.log(err));
  };

  const changeCityManager = e => {
    console.log('e', e);
    setSelectCityManager(e);
  };
  const submitLogin = async () => {
    const data = {
      newMembers: member,
      employees: employee,
      nonEmployees: nonMember,
      city: city._id,
      center: center._id,
      centerManagers: selectCenterManager,
      cityManagers: selectCityManager,
      user: userId,
    };
    createAttendance(data).then(response => {
      navigation.navigate('Home');
    });
  };
  useEffect(() => {
    AsyncStorageManager.getDataObject('user').then(response => {
      setUserRole(response.role);
      setUserId(response._id);
      if (
        userRole !== '630e22da936b4c901f78dc2d'
      ) {
        handleCenterAndCityManagers(response.center[0], response.city[0]);
      }
      if(isFocused){
        AsyncStorageManager.getDataObject('user').then(response => {
          console.log('response', response.role);
          setUserRole(response.role);
          setUserId(response._id);
          if (
            userRole !== '630e22da936b4c901f78dc2d'
           
          ) {
            handleCenterAndCityManagers(response.center[0], response.city[0]);
          }
        });
      }
    },[isFocused]);

    getCities()
      .then(response => {
        setCities(response.data);
      })
      .catch(err => console.log(err));
    console.log('userRole', userRole);
    if(isFocused){
      console.log("isFocused",isFocused)
     
    }
  }, [userRole]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTextStyle}>Add Attendance {userRole}</Text>
      </View>
      <ScrollView>
        <SafeAreaView style={styles.loginMainContainer}>
          <View style={styles.AttendanceTableFormBoxShadow}>
           
             {userRole && userRole === '630e22da936b4c901f78dc2d' ?(
              <View style={styles.container}>
              <Text style={styles.textInputLabel}>Choose City:</Text>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cities}
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocus ? 'choose City' : '...'}
                value={city}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={e => handleCity(e)}
              />
            </View>
             ): null }
          
            {userRole && userRole === '630e22da936b4c901f78dc2d'
            ? (
              <View style={styles.container}>
                <Text style={styles.textInputLabel}>Choose Center:</Text>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={centers}
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? 'choose Center' : '...'}
                  value={center}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={selectCenter}
                />
              </View>
            ) : null}

            <View style={styles.container}>
              <Text style={styles.textInputLabel}>City Manager:</Text>
              <MultiSelect
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTe
                iconStyle={styles.iconStyle}
                data={cityManagers}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'choose City Manager' : '...'}
                value={selectCityManager}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={changeCityManager}
              />
            </View>

            <View style={styles.container}>
              <Text style={styles.textInputLabel}>Center Manager:</Text>
              <MultiSelect
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={centerManagers}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'choose Center Manager' : '...'}
                value={selectCenterManager}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={e => setSelectCenterManager(e)}
              />
            </View>

            <View style={styles.signInInputWrapper}>
              <Text style={styles.textInputLabel}>new memeber:</Text>
              <TouchableOpacity>
                <TextInput
                  keyboardType="numeric"
                  onPressOut={() => setIsFocus(false)}
                  value={member}
                  onChangeText={Text => setmember(Text)}
                  placeholderTextColor="gray"
                  placeholder="Enter New Member"
                  style={styles.textInputText}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.signInInputWrapper}>
              <Text style={styles.textInputLabel}>Non Employee:</Text>
              <TouchableOpacity>
                <TextInput
                  value={nonMember}
                  onChangeText={Text => setnonMember(Text)}
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  placeholder="Enter non employee"
                  style={styles.textInputText}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.signInInputWrapper}>
              <Text style={styles.textInputLabel}>Employees:</Text>
              <TouchableOpacity>
                <TextInput
                  onPressOut={() => setIsFocus(false)}
                  value={employee}
                  onChangeText={Text => setEmployee(Text)}
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  placeholder="Enter employees"
                  style={styles.textInputText}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text onPress={submitLogin} style={styles.loginButton1}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default AttendanceTableForm;

const styles = StyleSheet.create({
  AttendanceTableFormBoxShadow: {
    width: '90%',
    marginTop: 7,
    paddingTop: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0,
    justifyContent: 'space-between',
    color: '#000',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: '10 10 10 rgba(10, 10, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  signInTitle: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 3,
    marginBottom: 10,
    paddingBottom: 4,
  },
  mainContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: '#F8FAF8',
  },
  signInInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    marginTop: 2,
    marginBottom: 2,
  },
  textInputLabel: {
    fontSize: 18,
    marginTop: 3,
    color: '#334FE5',
    marginBottom: 3,
  },
  textInputText: {
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
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
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 10,
    width: '90%',
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
  loginMainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
    borderRadius: 10,
  },
  signInTitle: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 4,
    marginBottom: 10,
    paddingBottom: 4,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },

  textInputText1: {
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
  },
  headerTextStyle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    backgroundColor: '#334FE5',
    color: '#fff',
    width: '100%',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 15,
    textAlign: 'center',
  },
});
