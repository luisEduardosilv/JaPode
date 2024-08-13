import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repeatSenha, setRepeatSenha] = useState('');

  const handleSignUp = () => {
    if (senha === repeatSenha) {
      createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          navigation.navigate('Login');
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert('The passwords must be the same');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#f55000', marginBottom: 20 }}>
        Sign-up
      </Text>

      <View style={{ width: 280, marginBottom: 15 }}>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 10, borderColor: 'darkgrey', height: 40, marginBottom: 15, backgroundColor: 'white', paddingHorizontal: 15 }}
          placeholder='E-mail'
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          style={{ borderWidth: 1, borderRadius: 10, borderColor: 'darkgrey', height: 40, marginBottom: 15, backgroundColor: 'white', paddingHorizontal: 15 }}
          placeholder='Password'
          onChangeText={(senha) => setSenha(senha)}
          value={senha}
          secureTextEntry={true}
        />
        <TextInput
          style={{ borderWidth: 1, borderRadius: 10, borderColor: 'darkgrey', height: 40, backgroundColor: 'white', paddingHorizontal: 15 }}
          placeholder='Repeat password'
          onChangeText={(repeatSenha) => setRepeatSenha(repeatSenha)}
          value={repeatSenha}
          secureTextEntry={true}
        />
      </View>

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
        onPress={handleSignUp}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Confirm</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#f55000' : '#f55000',
          borderRadius: 20,
          width: 140,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
        })}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
      </Pressable>
    </View>
  );
}
