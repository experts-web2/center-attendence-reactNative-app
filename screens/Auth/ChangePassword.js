import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.forgetmainContainer}>
      <View style={styles.forgetInputWrapper}>
        <View style={styles.forgetText}>
          <Text style={styles.forget}>Change Password</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.textInputLabel}>old Password</Text>
          <TouchableOpacity>
            <TextInput
              value={email}
              onChangeText={Text => setEmail(Text)}
              placeholder="old password"
              autoComplete="email"
              style={styles.textInputText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.textInputLabel}>new Password</Text>
          <TouchableOpacity>
            <TextInput
              value={email}
              onChangeText={Text => setEmail(Text)}
              placeholder="new password"
              autoComplete="email"
              style={styles.textInputText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.textInputLabel}>confirm Password</Text>
          <TouchableOpacity>
            <TextInput
              value={email}
              onChangeText={Text => setEmail(Text)}
              placeholder="confirm password"
              autoComplete="email"
              style={styles.textInputText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.forgetBtn}>
          <TouchableOpacity style={styles.loginButton}>
            <Button color="black" style={styles.loginBtn} title="Submit" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  forgetmainContainer: {
    display: 'flex',
  },
  forgetInputWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    marginTop: 60,
    marginBottom: 10,
  },
  forgetText: {
    marginTop: 30,
    marginBottom: 30,
  },
  forget: {
    fontFamily: 'sans-serif',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  textInputLabel: {
    fontSize: 20,
    marginTop: 5,
    color: 'black',
    marginBottom: 3,
    paddingBottom: 10,
  },
  textInputText: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
  },
  loginButton: {
    margin: 20,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  forgetBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  mainContainer: {
    marginTop: 20,
  },
});
