import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Leaderboard } from '../screens/LeaderBoard';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { View } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import { Host } from 'react-native-portalize';
import FriendsScreen from '../screens/FriendsScreen';
import AvatarsScreen from '../screens/AvatarsScreen';
import AvatarShopScreen from '../screens/AvatarShopScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import Edit_Screen from '../screens/Edit--Screen';
import LoginScreen3 from '../screens/LoginScreen3';
import LoginHelp from '../screens/FindAccountScr';
import EnterCodeScr from '../screens/EnterCodeScr';
import ResetPassScr from '../screens/ResetPassScr';
import SignUpScreen3 from '../screens/SignUpScreen3';
import FullNameScr from '../screens/FullNameScr';
import PicScreen from '../screens/PicScreen';
import RegFriendsScr from '../screens/RegFriendsScr';
import NotificationsScreen from '../screens/NotificationsScreen';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
        <NavigationContainer >
            <Host>
            <Stack.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false, animation: 'none' }}>
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />

                <Stack.Screen name="Login3" component={LoginScreen3} />

                <Stack.Screen name="SignUp3" component={SignUpScreen3} />
                <Stack.Screen name="FullName" component={FullNameScr} />
                <Stack.Screen name="Pic" component={PicScreen} />
                <Stack.Screen name="RegFriends" component={RegFriendsScr} />
                <Stack.Screen name="LoginHelp" component={LoginHelp} />

                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="Avatars" component={AvatarsScreen} />
                <Stack.Screen name="AvatarShop" component={AvatarShopScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="Edit" component={Edit_Screen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="EnterCode" component={EnterCodeScr} />
                <Stack.Screen name="ResetPassScr" component={ResetPassScr} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
            </Host>
        </NavigationContainer>
        </View>
    )
};