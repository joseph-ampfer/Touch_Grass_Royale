import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

const data = [
    {
      name: 'John Doe1',
      time: '500',
      pic: 'https://i.pravatar.cc/600/'
    },
    {
      name: 'Jampfer',
      time: '400',
      pic: 'https://i.pravatar.cc/60'
    },
    {
      name: 'Test test 3',
      time: '399',
      pic: 'https://i.pravatar.cc/60/68'
    },
    {
      name: 'Test test 4',
      time: '399',
      pic: 'https://i.pravatar.cc/60/63'
    },
    {
      name: 'Test test 5',
      time: '300',
      pic: 'https://i.pravatar.cc/60/64'
    },
    {
      name: 'Test test 6',
      time: '250',
      pic: 'https://i.pravatar.cc/60/65'
    },
    {
      name: 'Test test 1',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/66'
    },
    {
      name: 'Test test 2',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/67'
    },
    {
      name: 'Test test 3',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/69'
    },
    {
      name: 'Test test 4',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/70'
    },
    {
      name: 'Test test 5',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/80'
    },
    {
      name: 'Test test 6',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/90'
    },
    {
      name: 'Test test 1',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/10'
    },
    {
      name: 'Test test 2',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/20'
    },
    {
      name: 'Test test 3',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/30'
    },
    {
      name: 'Test test 4',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/40'
    },
    {
      name: 'Test test 5',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60'
    },
    {
      name: 'Test test 6',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60'
    },
  ]

export default function ProfileScreen() {
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1 `}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>
      <Image blurRadius={0} source={require('../assets/images/profileback.png')} style={tw`w-full h-full absolute`} />
        <View style={tw`flex-col justify-center items-center mb-5 mt-20`}>
          <Image 
            source={{ uri: data[1].pic }} 
            style={tw`h-26 w-26 rounded-full `}
          />
          <Text style={tw`text-lg font-bold text-center mt-3`}>{data[1].name}</Text>
        </View>
        <View style={tw`flex-row justify-evenly mx-5`}>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/first.png')} />
            <Text style={tw` text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/second.png')} />
            <Text style={tw` text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/third.png')} />
            <Text style={tw` text-lg font-bold`}>0</Text>
          </View>
        </View>
      </SafeAreaView>
      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}