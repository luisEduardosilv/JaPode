import { useState, useRef } from 'react';
import { View, Text, TextInput, Button,Image, Pressable } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Firebase';
import LottieView from 'lottie-react-native';

function LogoAnimation() {
    const lottieRef = useRef(null);
  
    if (!lottieRef.current) {
      lottieRef.current = (
        <LottieView
          autoPlay
          loop={true}
          source={require('../assets/logo.json')}
          style={{ width: 200, height: 200 }}
        />
      );
    }
  
    return lottieRef.current;
  }


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail('');
                setSenha('');
                navigation.navigate('Auth', { 
                    screen:'Profile',
                    params:{ email:email }
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    const esqueceuSenha = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("An email to reset your password has been sent to the provided email address.");
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <LogoAnimation/>
            <View>
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, borderColor: 'darkgray', height: '13%', width: 280, marginBottom: 15, backgroundColor: 'white' }}
                    placeholder='  E-mail'
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, borderColor: 'white', height: '12%', width: 280, backgroundColor: 'white' }}
                    placeholder='  Password'
                    onChangeText={(senha) => setSenha(senha)}
                    value={senha}
                    secureTextEntry={true}
                />
                <View style={{ alignItems: 'flex-end', marginTop: '5%' }}>
                    <Pressable onPress={esqueceuSenha}>
                        <Text style={{ color: '#f55000' }}>Forgot your password?</Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', marginTop: '2%' }}>
                    <View style={{ marginBottom: 10 }}>
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
                            onPress={handleLogin}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white' }}>Don't have an account? </Text>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: '#f55000' }}>Sign-up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}