import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Leaderboard } from '../screens/LeaderBoard';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { View } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileScreen2 from '../screens/profileScreen2';
import ProfileScreen3 from '../screens/ProfileScreen3';
import { Host } from 'react-native-portalize';
import FriendsScreen from '../screens/FriendsScreen';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
        <NavigationContainer >
            <Host>
            <Stack.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false, animation: 'none' }}>
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen2} />
                <Stack.Screen name="Friends" component={FriendsScreen} />
            </Stack.Navigator>
            </Host>
        </NavigationContainer>
        </View>
    )
};