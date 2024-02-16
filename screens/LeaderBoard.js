import React from "react";
import tw from 'twrnc';
import { Image, ScrollView, Text, View } from "react-native";
import MyText from "../components/MyText";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context'


const data = [
    {
      name: 'Test test 1',
      time: '500',
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
    return (
        <SafeAreaView style={tw`bg-blue-500`}>
        <View style={tw`flex h-full bg-black`}>
        <StatusBar style="light" />
          <View style={tw`flex-row bg-blue-600`}>
              <View style={tw`flex-1 mx-auto bg-gray-200 bg-opacity-30 pt-4`}>
                    <Image 
                      source={{ uri: data[1].pic }} 
                      style={tw`h-16 w-16 rounded-full mx-auto`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[1].name}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-gray-900 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[1].time}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-5xl py-4 font-black`}>2</Text>
              </View>
              <View style={tw`flex-1 mx-auto bg-gray-200 bg-opacity-40 pt-12`}>
                    <Image 
                      source={{ uri: data[0].pic }} 
                      style={tw`h-20 w-20 rounded-full mx-auto`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[0].name}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-gray-900 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[0].time}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-8xl pt-4 font-black`}>1</Text>
              </View>
              <View style={tw`flex-1 mx-auto bg-gray-200 bg-opacity-20 pt-4`}>
                    <Image 
                      source={{ uri: data[2].pic }} 
                      style={tw`h-12 w-12 rounded-full mx-auto`}
                    />
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[2].name}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-gray-900 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[2].time}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-4xl py-4 font-black`}>3</Text>
              </View>
          </View>
          <ScrollView style={tw`flex-1 gap-4 bg-black shadow-md`}>
              {data.slice(3).map((value, i) => (
                  <View style={tw`flex-row relative py-0.5 w-full`}>
                    <View style={tw`h-full w-[${
                            (value.time / data[0].time) * 100
                        }%] bg-blue-500 bg-opacity-30 shadow-sm absolute`} 
                    />
                    <View 
                      style={tw`flex-row relative shadow-sm gap-4 py-4 px-4 items-center w-full`} 
                      key={i}
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



    );
}