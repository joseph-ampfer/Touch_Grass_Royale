import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import RequestCard from '../components/RequestCard';

const data = [
    {
      name: 'eener_weiner',
      time: '500',
      pic: 'https://i.pravatar.cc/600/'
    },
    {
      name: 'test 2',
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
      name: 'Jampfer',
      time: '100',
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

const friendRequests = [
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

export default function ProfileScreen3() {
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <Image blurRadius={20} source={require('../assets/images/full.png')} style={tw`absolute w-full h-full -z-50`} />
      <SafeAreaView style={tw`flex-1`}>

        <View style={tw`flex-row items-center justify-center mt-3`}>
          <Image style={tw`w-25 h-25 rounded-full mr-5`} source={{ uri: data[0].pic}} />
          <View style={tw`flex-col`}>
            <Text style={tw`text-white text-3xl`}>{data[0].name}</Text>
            <Text style={tw`text-white text-xl`}>{'1 million'} friends</Text>
          </View>
        </View>

        <Text style={tw`text-center text-white text-2xl font-bold underline mt-10`}>STATS</Text>
        <View style={tw`flex-col items-center`}>
          <View style={tw`flex-col items-center relative mb-2`}>
            <Text style={tw`text-white text-lg`}>1st place wins</Text>
            <Image style={tw`h-25 w-25`} source={require('../assets/images/goldStar3.png')} />
            <Text style={tw`text-slate text-3xl font-bold absolute top-1/2  rounded-xl px-1`}>122</Text>
          </View>
          <View style={tw`flex-col items-center relative mb-2`}>
            <Text style={tw`text-white text-lg`}>2nd place wins</Text>
            <Image style={tw`h-25 w-25`} source={require('../assets/images/silverStar3.png')} />
            <Text style={tw`text-slate text-3xl font-bold absolute top-1/2  rounded-xl px-1`}>1</Text>
          </View>
          <View style={tw`flex-col items-center relative mb-2`}>
            <Text style={tw`text-white text-lg`}>3rd place wins</Text>
            <Image style={tw`h-25 w-25`} source={require('../assets/images/bronzeStar3.png')} />
            <Text style={tw`text-slate text-3xl font-bold absolute top-1/2  rounded-xl px-1`}>5</Text>
          </View>
          <View style={tw`flex-col items-center relative`}>
            <Text style={tw`text-white text-lg`}>Dead last</Text>
            <Image style={tw`h-20 w-20`} source={require('../assets/images/skull2.png')} />
            <Text style={tw`text-slate text-3xl font-bold absolute top-1/2  rounded-xl px-1`}>0</Text>
          </View>

        </View>

      </SafeAreaView>
      <BottomNavBar />
    </View>
    </GestureHandlerRootView>
  )
}