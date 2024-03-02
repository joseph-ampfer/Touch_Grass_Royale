import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import { Image, ScrollView, Text, View, } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native";
import BottomNavBar from "../components/BottomNavBar";
import NumberTicker from 'react-native-number-ticker';
import MyNumberTicker from "../components/MyNumberTicker";


const data = [
    {
      name: 'Test test 1',
      time: '525',
      pic: 'https://i.pravatar.cc/600/'
    },
    {
      name: 'Test test 2',
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

export function Leaderboard() {
    const insets = useSafeAreaInsets();
    
    return (
      <View style={tw`flex-1 bg-black`}>
        <SafeAreaView >
          <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
          <Image blurRadius={2} style={tw`h-full w-full absolute`} source={require('../assets/images/birds.png')} />
          <View style={tw`flex h-full`}>
          <StatusBar style="light" />
            <View style={tw`flex-row`}>
{/* =======SECOND PLACE======= pt-4 */}
                <View style={[tw`flex-1 mx-auto   mt-21  rounded-t-full mb-0`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                    <Image 
                      source={{ uri: data[1].pic }} 
                      style={tw`h-16 w-16 rounded-full mx-auto mt-5`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[1].name}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-gray-500 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[1].time}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-5xl py-4 font-black`}>2</Text>
                </View>
{/* =======FIRST PLACE======= */}
                <View style={tw`h-20 w-20 absolute ml-41 z-30 top-0 `}>
                  <LottieView
                    source={require('../assets/animations/crown.json')}
                    style={{width:'100%', height:'100%'}}
                    autoPlay
                    loop={false} 
                  />
                </View>
                <View style={[tw`flex-1 mx-auto   mt-9 rounded-t-full`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                    <Image 
                      source={{ uri: data[0].pic }} 
                      style={tw`h-20 w-20 rounded-full mx-auto mt-5`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[0].name}</Text>
                    {/* <Text style={tw`text-slate-50 text-sm bg-yellow-500 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[0].time}
                    </Text> */}
                    <MyNumberTicker
                      number={data[0].time}
                      textSize={17}
                      duration={3500}
                      textStyle={tw`text-slate-50 text-center`}
                      style={tw`bg-yellow-500 rounded-full mx-10 px-2 pb-1.5 pt-.5 `}
                    />
                    <Text style={tw`text-slate-50 text-center text-8xl pt-4 font-black`}>1</Text>
                </View>
{/* ========THIRD PLACE======= */}
                <View style={[tw`flex-1 mx-auto   mt-27 rounded-t-full mb-0`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                    <Image 
                      source={{ uri: data[2].pic }} 
                      style={tw`h-12 w-12 rounded-full mx-auto mt-5`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[2].name}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-yellow-900 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[2].time}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-4xl py-4 font-black`}>3</Text>
                </View>
            </View>
{/* ========LEADERBOARD======= */}
            <ScrollView 
              style={tw`flex-1 gap-4 bg-black shadow-md`}
              contentContainerStyle={{ paddingBottom: insets.bottom + 45 }}
            >
                {data.slice(3).map((value, i) => (
                    <View 
                      style={tw`flex-row relative py-0.5 w-full`}
                      key={i}
                    >
                      <View style={tw`h-full w-[${
                              (value.time / data[0].time) * 100
                          }%] bg-blue-500 bg-opacity-30 shadow-sm absolute`} 
                      />
                      <View 
                        style={tw`flex-row relative shadow-sm gap-4 py-4 px-4 items-center w-full`} 
                      >
                          <Text style={tw`text-slate-50 text-sm`}>{i + 4}</Text>
                          <Image 
                            source={{ uri: value.pic }} 
                            style={tw`h-10 w-10 rounded-full mx-auto`}
                          />
                          <Text style={tw`text-slate-50 flex-1 font-semibold`}>{value.name}</Text>
                          <Text style={tw`text-slate-50 text-sm bg-opacity-80 my-auto bg-blue-600 rounded-full px-3`}>
                            {value.time}
                          </Text>
                      </View>
                    </View>
                ))}
            </ScrollView>
          </View>
        </SafeAreaView>
        <BottomNavBar/>
      </View>
        
    );
}