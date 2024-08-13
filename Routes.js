import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Telas/Login';
import SignUp from './Telas/SignUp';
import Profile from './Telas/Profile';
import SplashScreen from './Telas/SplashScreen';
import Discover from './Telas/Discover';
import Search from './Telas/Search';
import RecipeDetailScreen from './Telas/RecipeDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: 'white', 
        }}
      >
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{
            tabBarStyle: { display: "none" },
          }}
        />
        <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen
          name='RecipeDetailScreen'
          component={RecipeDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function AuthStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        style: { backgroundColor: 'pink' },
        tabBarStyle: { backgroundColor: '#0A0A0A' },
        tabBarActiveTintColor: '#ff6d2a', 
        tabBarInactiveTintColor: 'grey', 
        headerStyle: {
          backgroundColor: 'black', 
        },
        headerTintColor: 'white', 
      }}
    >
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="user-circle" size={24} color="#f55000" />,
          headerTintColor: 'black',
        }}
      />
      <Tab.Screen
        name='Discover'
        component={Discover}
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="food-turkey" size={24} color="#f55000" />,
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: () => <Icon name="search" size={24} color="#f55000" />,
        }}
      />
    </Tab.Navigator>
  );
}