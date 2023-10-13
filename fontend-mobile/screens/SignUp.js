import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, StyleSheet, Border } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.43.93:8080/auth/register', {
        firstname,
        lastname,
        email,
        password,
        role: 'user'
      });

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        // Handle success, e.g., navigate to the next screen
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, e.g., show an error message to the user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        {/* First Name */}
        <View style={styles.inputField}>
          <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            style={styles.input}
            placeholder="Enter your First Name"
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputField}>
          <Icon name="user" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            style={styles.input}
            placeholder="Enter your Last Name"
          />
        </View>

        {/* Email */}
        <View style={styles.inputField}>
          <Icon name="envelope" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter your Email"
          />
        </View>

        {/* Password */}
        <View style={styles.inputField}>
          <Icon name="lock" size={20} color="gray" style={styles.inputIcon} />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter your Password"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 300
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  // Add more styles as needed
});

export default SignUp;
