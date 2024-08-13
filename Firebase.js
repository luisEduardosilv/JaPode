import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: "AIzaSyCdBilmFoDENghIg0xoWRvjdm8H9nJttR4",
    authDomain: "japodedb-firebase-b12ac.firebaseapp.com",
    projectId: "japodedb-firebase-b12ac",
    storageBucket: "japodedb-firebase-b12ac.appspot.com",
    messagingSenderId: "577943744923",
    appId: "1:577943744923: web: dbc43a3876c7cc00c1313e" 
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
persistence: getReactNativePersistence (ReactNativeAsyncStorage) });
export { auth };