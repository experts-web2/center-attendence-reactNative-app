import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getCities,
  getUserRoles,
  getCentersByCity,
  createUser,
} from '../../services/AuthService';

const SignUpScreen = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [city, setCity] = useState('choose');
  const [center, setCenter] = useState('choose');
  const [role, setRole] = useState('choose');
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [centers, setCenters] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const submitLogin = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      city: city,
      center: center,
      role: role
    }
    console.log('called');
    createUser(data)
      .then(res => console.log('res', res))
      .catch(err => console.log(err));
  };

  const handleCity = e => {
    console.log('event', e);
    setCity(e._id);
    getCentersByCity(e._id)
      .then(response => setCenters(response.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getUserRoles()
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => console.log(err));

    getCities()
      .then(response => {
        console.log('response', response.data);
        setCities(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <SafeAreaView style={styles.loginMainContainer}>
          <Text style={styles.signInTitle}>Sign Up</Text>
          <View style={styles.signInInputWrapper}>
            <Text style={styles.textInputLabel}>Email :</Text>
            <TouchableOpacity>
              <TextInput
                value={email}
                onChangeText={Text => setEmail(Text)}
                placeholder="Enter Email"
                autoComplete="email"
                style={styles.textInputText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signInInputWrapper}>
            <Text style={styles.textInputLabel}>Name :</Text>
            <TouchableOpacity>
              <TextInput
                value={name}
                onChangeText={Text => setName(Text)}
                placeholderTextColor="gray"
                autoComplete="name"
                placeholder="Enter Name"
                style={styles.textInputText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signInInputWrapper}>
            <Text style={styles.textInputLabel}>Password :</Text>
            <TouchableOpacity>
              <TextInput
                value={password}
                onChangeText={Text => setPassword(Text)}
                placeholderTextColor="gray"
                autoComplete="password"
                placeholder="Enter Password"
                style={styles.textInputText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signInInputWrapper}>
            <Text style={styles.textInputLabel}>Phone Number :</Text>
            <TouchableOpacity>
              <TextInput
                value={phoneNumber}
                onChangeText={Text => setPhoneNumber(Text)}
                placeholderTextColor="gray"
                autoComplete="tel"
                placeholder="Enter Number"
                style={styles.textInputText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
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

          <View style={styles.container}>
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
              onChange={item => {
                console.log('item', item);
                setCenter(item._id);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={roles}
              search
              maxHeight={300}
              labelField="role"
              valueField="role"
              placeholder={!isFocus ? 'choose Role' : '...'}
              value={role}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setRole(item._id);
                setIsFocus(false);
              }}
            />
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text onPress={submitLogin} style={styles.loginButton1}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  loginMainContainer: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    paddingTop: 1,
    paddingBottom: 30,
    borderRadius: 10,
    width: '90%',
    marginTop: 2,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
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
    fontSize: 30,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 4,
    marginBottom: 10,
    paddingBottom: 4,
  },
  mainContainer: {
    width: Dimensions.get('window').width,
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signInInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    marginTop: 2,
    marginBottom: 2
  },
  textInputLabel: {
    fontSize: 18,
    marginTop: 3,
    color: "#334FE5",
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
    backgroundColor: "#334FE5",
    height: 50,
    marginVertical: 10,
    marginLeft: 2,
    marginRight: 2,
    paddingHorizontal: 10,
  },
  loginBtn: {
    fontSize: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    marginTop: 10,
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
  loginButton1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    height: 50,
  },
});
