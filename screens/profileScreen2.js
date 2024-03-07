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


export default function ProfileScreen2() {
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>
      <Image blurRadius={30} source={require('../assets/images/star (4).png')} style={tw`w-full h-full absolute`} />
        
        <View style={tw`flex-row justify-around mt-10`}>
          <View style={tw`flex-col items-center justify-center w-16`}>
            <Text style={tw`text-white font-bold text-xl`}>1.7k</Text>
            <Text style={tw`text-slate-400 font-semibold`}>Followers</Text>
          </View>
          <Image 
            source={{ uri: data[0].pic }} 
            style={tw`h-36 w-36 rounded-full `}
          />
          <View style={tw`flex-col items-center justify-center w-16`}>
            <Text style={tw`text-white font-bold text-xl`}>12</Text>
            <Text style={tw`text-slate-400 font-semibold`}>Posts</Text>
          </View>
        </View>
        
        <View style={tw`flex-col justify-center items-center mb-5 `}>
          <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{data[1].name}</Text>
          <TouchableOpacity>
            <Text style={tw`text-slate-500 `}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={tw`text-gray-100 text-lg font-semibold ml-5 mb-3`}>Trophies</Text>
        <View style={tw`flex-row justify-evenly mx-5`}>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/first.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/second.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-10 w-10 `} source={require('../assets/images/third.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
        </View>

        <Text style={tw`text-gray-100 text-lg font-semibold ml-5 mb-3 mt-5`}>Friend requests</Text>
        <View style={tw`ml-5`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              friendRequests.map((user, index) => {
                return (
                  // friend component
                  <RequestCard key={index} user={user} />
                )
              })
            }
          </ScrollView>
        </View>

      </SafeAreaView>
      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}