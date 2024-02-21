import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const data = [
  {
    name: 'John Doe1',
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

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
      <SafeAreaView style={tw`flex-1`}>

        {/* current winner */}
        <View style={[tw`mx-5 h-29 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
          <View style={tw``}>
            <View style={tw`flex-row justify-between`} >
              {/* pic and stats */}
              <View style={tw`mx-10`}>
                <Image 
                  source={{ uri: data[0].pic }} 
                  style={tw`h-16 w-16 rounded-full mx-auto`}
                />
                <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[0].name}</Text>
              </View>
              <View style={tw`flex-2 justify-center `}>
                <Text style={tw`font-bold text-lg text-white mr-5 text-center`}>{data[0].name} is winning with {data[0].time} points, catch up! </Text>
              </View>
            </View>
          </View>
        </View>

        {/* leaderboard preview */}
        <View style={[tw`mx-5 h-72 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>

            <View style={tw`flex-1    `}>
              {data.slice(0,5).map((value, i) => (
                  <View style={tw`flex-row relative py-0.25 w-full`}>
                    <View style={tw`h-full rounded-r-2xl w-[${
                            (value.time / data[0].time) * 100
                        }%] bg-blue-500 bg-opacity-40  absolute`} 
                    />
                    <View 
                      style={tw`flex-row relative  gap-4 py-2 px-4 items-center w-full`} 
                      key={i}
                    >
                        <Text style={tw`text-slate-50 text-sm`}>{i + 1}</Text>
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
            </View>

          </View>

          {/* users stats */}
          <View style={tw`mt-5 flex-row mx-5 justify-between`}>
            <View style={[tw`h-29 w-45 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              <View style={tw``}>
                <Text style={tw`text-center font-bold text-white text-2xl mb-2`}>7th Place</Text>
                <Text style={tw`text-center font-semibold text-white/50`}>200 points</Text>
              </View>
            </View>
            {/* hours remaining */}
            <View style={[tw`h-29 w-45 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              <View style={tw`flex-row justify-center items-center`}>
                <View style={tw`items-center justify-center`}>
                  <Text style={tw`font-bold text-white/80 text-6xl ml-2 mt-2`}>10</Text>
                </View>
                <View>
                  <Text style={tw`flex  font-semibold text-white/50 ml-2 text-lg`}>hours</Text>
                  <Text style={tw`flex  font-semibold text-white/50 ml-2 mr-2 text-left`}>remaining</Text>
                </View>
              </View>
            </View>
          </View>

          {/* notify loser */}
          <View style={[tw`mx-5 mt-5 h-19 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            <TouchableOpacity 
              style={tw`w-full h-full flex-row justify-between items-center`}
              onPress={show}
            >
            <View style={tw`h-15 w-15`}>
                <LottieView 
                    source={require('../assets/animations/arrows.json')} 
                    style={{width:'100%', height:'100%', transform: [{rotate: '-90deg'}]}}
                    autoPlay 
                    loop 
                    speed={1}
                />
              </View>
              <View style={tw`justify-center`}>
                <Text style={tw`text-center  text-white/90 text-sm font-semibold`}>Tell last place they need to touch grass.</Text>
              </View>
              <View style={tw`h-15 w-15 `}>
                <LottieView 
                    source={require('../assets/animations/arrows.json')} 
                    style={{width:'100%', height:'100%', transform: [{rotate: '90deg'}]}}
                    autoPlay 
                    loop 
                    speed={1}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[tw`mx-5 mt-5 h-19 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            
          </View>
          {/* modal */}
          <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={hide}
            transparent={false}
          >
            <View style={tw`h-10 w-full`}>
              <View>
                <Text>You need to touch grass.</Text>
              </View>
              <TouchableOpacity
                onPress={hide}
              >
                <Text>hide</Text>
              </TouchableOpacity>
            </View>
          </Modal>

      </SafeAreaView>
    </View>
  )
}