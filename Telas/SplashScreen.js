import { View } from "react-native";
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
            <LottieView 
            autoPlay 
            loop={false}
            source={require('../assets/logo6.json')}
            onAnimationFinish={() => navigation.navigate('Login')}
            />
        </View>
    );
}