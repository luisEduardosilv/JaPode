import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';

export default function Profile({ navigation, route }) {
  const emailSemArroba = route.params.email.split('@');
  const nickname = emailSemArroba[0];
  const userEmail = route.params.email;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Icon name="user-circle" size={100} color="white" />
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
        Hello, <Text style={{ marginLeft: 10 }}>{nickname}</Text>
      </Text>
      <Text style={{ marginTop: 10, color: 'white' }}>
        Your e-mail: {userEmail}
      </Text>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#f55000' : '#f55000',
            borderRadius: 20,
            width: 140,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
          })}
          onPress={handleLogout}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}