import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorageManager from '../../Managers/AsyncStorageManager';
import {login} from '../../services/AuthService';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useIsFocused} from '@react-navigation/native';
const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const LoginScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [user, SetUser] = useState({
    email: '',
    password: '',
  });

  const submitLogin = async values => {
    try {
      login(values)
        .then(response => {
          console.log('response', response.data.newUser);
          AsyncStorageManager.storeDataObject('user', response.data.newUser);
          AsyncStorageManager.storeDataObject('token', response.data.token);
          ToastAndroid.showWithGravity(
            JSON.stringify('Login Successfully'),
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setTimeout(() => {
            navigation.navigate('TabBar1');
          }, 1000);
        })
        .catch(err =>
          ToastAndroid.showWithGravity(
            JSON.stringify(err),
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          ),
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      AsyncStorageManager.clearAllAsyncData();
    }
    console.log('user data');
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Formik
          initialValues={user}
          validationSchema={ValidationSchema}
          onSubmit={values => {
            submitLogin(values);
          }}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            handleReset,
            handleSubmit,
          }) => {
            const {email, password} = values;
            console.log('values', touched.email);
            return (
              <SafeAreaView
                style={[styles.loginMainContainer, styles.boxShadowinLogin]}>
                <View style={styles.loginCircle}>
                  <Icon
                    style={styles.signInTitle}
                    name="user"
                    size={70}
                    color="#000"
                  />
                </View>
                <View style={styles.signInInputWrapper}>
                  <Text style={styles.textInputLabel}>Email</Text>
                  <TouchableOpacity>
                    <TextInput
                      value={email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="Enter Email"
                      autoComplete="email"
                      style={styles.textInputText}
                    />
                  </TouchableOpacity>
                </View>
                {errors && errors.email && touched.email ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 20}}>
                    {errors.email}
                  </Text>
                ) : null}

                <View style={styles.signInInputWrapper}>
                  <Text style={styles.textInputLabel}>Password</Text>
                  <TouchableOpacity>
                    <TextInput
                      value={password}
                      onChangeText={handleChange('password')}
                      placeholderTextColor="gray"
                      autoComplete="password"
                      onBlur={handleBlur('password')}
                      placeholder="Enter Password"
                      style={styles.textInputText}
                    />
                  </TouchableOpacity>
                </View>
                {errors && errors.password && touched.password ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 20}}>
                    {errors.password}
                  </Text>
                ) : null}
                <TouchableOpacity style={styles.loginButton}>
                  <Text onPress={handleSubmit} style={styles.loginButton1}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </SafeAreaView>
            );
          }}
        </Formik>

        <View style={styles.userFlexDirection}>
          <View style={styles.dontHaveAccount}>
            <Text style={styles.dontHaveAccountText}>
              Dont have an account?
            </Text>
            <TouchableOpacity
              onPress={() => console.log(navigation.navigate('Register'))}>
              <Text style={styles.dontHaveAccountButton}>signUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgetBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.dontHaveAccountButton}>forget password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginMainContainer: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    paddingTop: 10,
    paddingBottom: 30,
    borderRadius: 10,
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
    fontSize: 30,
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 4,
    marginBottom: 10,
    paddingBottom: 4,
  },
  boxShadowinLogin: {
    shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {width: 30, height: 30},
  },
  mainContainer: {
    width: Dimensions.get('window').width,
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
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
    color: '#334FE5',
    marginBottom: 3,
  },
  textInputText: {
    fontSize: 20,
    width: '90%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
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
  userFlexDirection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    // borderWidth: 2,
  },
  dontHaveAccountText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  dontHaveAccountButton: {
    color: 'blue',
    fontSize: 15,
    marginLeft: 5,
    marginLeft: 3,
  },
  forgetBtn: {
    marginLeft: 20,
  },
  dontHaveAccount: {
    display: 'flex',
    width: '60%',
    flexDirection: 'row',
  },
});
