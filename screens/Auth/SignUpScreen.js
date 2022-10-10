import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
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
    const data={
      name:name,
      email:email,
      password:password,
      phoneNumber:phoneNumber,
      city:city,
      center:center,
      role:role
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
            <Button
              color="black"
              style={styles.loginButton}
              title="Sign Up"
              onPress={submitLogin}
            />
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
    backgroundColor: 'white',
    paddingTop: 30,
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
  mainContainer: {
    width: '90%',
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signInInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  textInputLabel: {
    fontSize: 20,
    marginTop: 5,
    color: 'black',
    marginBottom: 3,
  },
  textInputText: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    // borderWidth:2,
    width: '90%',
  },
  loginButton: {
    margin: 20,
    paddingTop: 10,
    fontSize: 20,
  },
  loginBtn: {
    fontSize: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
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
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',

    color: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
