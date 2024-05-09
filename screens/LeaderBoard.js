import React, { useState, useEffect } from "react";
import tw from 'twrnc';
import { Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View, } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import LottieView from "lottie-react-native";
import BottomNavBar from "../components/BottomNavBar";
import NumberTicker from 'react-native-number-ticker';
import MyNumberTicker from "../components/MyNumberTicker";
import Animated, {FadeInDown}  from "react-native-reanimated";
import ProfileModal from "../components/ProfileModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLeaderboard } from "../apiFetches/fetches";
import { RefreshControl } from "react-native-gesture-handler";
// import { getLeaderboard } from "../queries"


// const data = [
//   {
//     name: 'JohnDoe',
//     time: '524',
//     pic: 'https://i.pravatar.cc/600/',
//     lottie: 'spaceJam'
//   },
//   {
//     name: 'Hexscuseme',
//     time: '500',
//     pic: 'https://i.pravatar.cc/60',
//     lottie: 'gojoCat'
//   },
//   {
//     name: 'Nephlauxic',
//     time: '499',
//     pic: 'https://i.pravatar.cc/60/68',
//     lottie: null
//   },
//   {
//     name: 'Hobbes',
//     time: '461',
//     pic: 'https://i.pravatar.cc/60/63',
//     lottie: 'spaceInvader'
//   },
//   {
//     name: 'eener_weiner',
//     time: '444',
//     pic: 'https://i.pravatar.cc/60/64',
//     lottie: null
//   },
//   {
//     name: 'Test 6',
//     time: '443',
//     pic: 'https://i.pravatar.cc/60/65',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'jampfer',
//     time: '411',
//     pic: 'https://i.pravatar.cc/60/66',
//     lottie: 'eyeBlob'
//   },
//   {
//     name: 'Dennis',
//     time: '400',
//     pic: 'https://i.pravatar.cc/60/67',
//     lottie: 'ramen'
//   },
//   {
//     name: 'frobro',
//     time: '399',
//     pic: 'https://i.pravatar.cc/60/69',
//     lottie: 'meditationCow'
//   },
//   {
//     name: 'Test test 4',
//     time: '350',
//     pic: 'https://i.pravatar.cc/60/70',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 5',
//     time: '300',
//     pic: 'https://i.pravatar.cc/60/80',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 6',
//     time: '100',
//     pic: 'https://i.pravatar.cc/60/90',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 1',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/10',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 2',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/20',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 3',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/30',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 4',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/40',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 5',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 6',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl'
//   },
// ]

export function Leaderboard() {

  const {data, isLoading, error} = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  })

  const queryClient = useQueryClient();

    const [selectedUser, setSelectedUser] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const insets = useSafeAreaInsets();

    const isLoading1 = 0;

    if (isLoading) {
      return (
        <View style={tw`flex-1 bg-black`}>
        <SafeAreaView >
          <Image blurRadius={70} style={tw`w-full h-full absolute`} fadeDuration={100} source={require('../assets/images/full.png')}  />
          <Image blurRadius={2} style={tw`h-full w-full absolute`} source={require('../assets/images/birds.png')} />
          <View style={tw`flex h-full`}>
          <StatusBar style="light" />

{/* ==========TOP HALF=========== */}
            <View style={tw`flex-row h-4/11`}>
{/* =======SECOND PLACE======= pt-4 */}
                <TouchableOpacity 
                  style={[tw`flex-1 mx-auto   mt-21  rounded-t-full mb-0 bg-black/60`,]}
                  activeOpacity={0.9}
                >
                        <View style={tw`h-16 w-16 rounded-full mx-auto mt-5`}>

                        </View>
                </TouchableOpacity>
{/* =======FIRST PLACE======= */}
                <TouchableOpacity 
                  style={[tw`flex-1 mx-auto   mt-9 rounded-t-full bg-black/60`, ]}
                  activeOpacity={0.9}
                >
                        <View style={tw`h-20 w-20 rounded-full mx-auto mt-5`}>

                        </View>
                </TouchableOpacity>
{/* ========THIRD PLACE======= */}
                <TouchableOpacity
                  style={[tw`flex-1 mx-auto   mt-27 rounded-t-full mb-0 bg-black/60`, ]}
                  activeOpacity={0.9}
                >
                  <View>
                        <View style={tw`h-12 w-12 rounded-full mx-auto mt-5`}>

                        </View>
                  </View>
                </TouchableOpacity>
            </View>
{/* ========LEADERBOARD======= */}
            <ScrollView 
              style={tw`flex-1 gap-4 bg-black shadow-md`}
              contentContainerStyle={{ paddingBottom: insets.bottom + 45 }}
            >
                {Array.from({ length: 8}).map((_, i) => (
                  <View key={i} >
                    <TouchableOpacity 
                      style={tw`flex-row relative py-0.5 w-full`}

                    >
                      <View style={tw`h-full w-[${ (80 - i * 10) }%] bg-blue-500 bg-opacity-30 shadow-sm absolute`} 
                      />
                      <View 
                        style={tw`flex-row relative shadow-sm gap-4 py-4 px-4 items-center w-full`} 
                      >
                          {/* <Text style={tw`text-slate-50 text-sm`}>{i + 4}</Text> */}

                              <View style={tw`h-10 w-10 rounded-full mx-auto`}>

                              </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        </SafeAreaView>
        <BottomNavBar/>
      </View>
      )
    }
    
    return (
      <View style={tw`flex-1 bg-black`}>
        <SafeAreaView >
          <Image blurRadius={70} style={tw`w-full h-full absolute`} fadeDuration={100} source={require('../assets/images/full.png')}  />
          <Image blurRadius={2} style={tw`h-full w-full absolute`} source={require('../assets/images/birds.png')} />
          <View style={tw`flex h-full`}>
          <StatusBar style="light" />

{/* ==========TOP HALF=========== */}
            <View style={tw`flex-row`}>
{/* =======SECOND PLACE======= pt-4 */}
                <TouchableOpacity 
                  style={[tw`flex-1 mx-auto   mt-21  rounded-t-full mb-0 bg-black/60`,]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedUser(data[1]);
                    setModalOpen(true);
                  }}
                >
                    {
                      data[1]?.lottie? (
                        <View style={tw`h-16 w-16 rounded-full mx-auto mt-5`}>
                          <LottieView
                            source={{ uri: data[1].lottie }}
                            style={tw`h-full w-full`}
                            autoPlay
                            loop
                            speed={1}
                          />
                        </View>
                      ):(
                        <Image 
                        source={{ uri: data[1]?.pic }} 
                        style={tw`h-16 w-16 rounded-full mx-auto mt-5`}
                      />
                      )
                    }
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[1]?.username}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-gray-500 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[1]?.todays_points}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-5xl py-4 font-black`}>2</Text>
                </TouchableOpacity>
{/* =======FIRST PLACE======= */}
                <View style={tw`h-20 w-20 absolute ml-41 z-30 top-0 `}>
                  <LottieView
                    source={require('../assets/animations/crown.json')}
                    style={{width:'100%', height:'100%'}}
                    autoPlay
                    loop={false} 
                  />
                </View>
                <TouchableOpacity 
                  style={[tw`flex-1 mx-auto   mt-9 rounded-t-full bg-black/60  z-0`, ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedUser(data[0]);
                    setModalOpen(true);
                  }}
                >
                    {
                      data[0].lottie? (
                        <View style={tw`h-20 w-20 rounded-full mx-auto mt-5`}>
                          <LottieView
                            source={{ uri: data[0].lottie }}
                            style={tw`h-full w-full`}
                            autoPlay
                            loop
                            speed={1}
                          />
                        </View>
                      ):(
                        <Image 
                          source={{ uri: data[0].pic }} 
                          style={tw`h-20 w-20 rounded-full mx-auto mt-5`}
                        />
                      )
                    }
                    <Text style={tw`text-slate-50 font-semibold text-center py-1 text-base`}>{data[0].username}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-yellow-500 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[0].todays_points}
                    </Text>
                    {/* <MyNumberTicker
                      number={data[0].todays_points}
                      textSize={17}
                      duration={3500}
                      textStyle={tw`text-slate-50 text-center`}
                      style={tw`bg-yellow-500 rounded-full mx-10 px-2 pb-1.5 pt-.5 `}
                    /> */}
                    <Text style={tw`text-slate-50 text-center text-8xl pt-4 font-black`}>1</Text>
                </TouchableOpacity>
{/* ========THIRD PLACE======= */}
                <TouchableOpacity
                  style={[tw`flex-1 mx-auto   mt-27 rounded-t-full mb-0 bg-black/60`, ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedUser(data[2]);
                    setModalOpen(true);
                  }}
                >
                  <View>
                    {
                      data[2]?.lottie? (
                        <View style={tw`h-12 w-12 rounded-full mx-auto mt-5`}>
                          <LottieView
                            source={{ uri: data[2].lottie }}
                            style={tw`h-full w-full`}
                            autoPlay
                            loop
                            speed={1}
                          />
                        </View>
                      ):(
                        <Image 
                          source={{ uri: data[2]?.pic }} 
                          style={tw`h-12 w-12 rounded-full mx-auto mt-5`}
                        />
                      )
                    }
                    <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[2]?.username}</Text>
                    <Text style={tw`text-slate-50 text-sm bg-yellow-900 rounded-full mx-10 px-2 py-0.5 text-center`}>
                        {data[2]?.todays_points}
                    </Text>
                    <Text style={tw`text-slate-50 text-center text-4xl py-4 font-black`}>3</Text>
                  </View>
                </TouchableOpacity>
            </View>
{/* ========LEADERBOARD======= */}
            <ScrollView 
              style={tw`flex-1 gap-4 bg-black shadow-md`}
              contentContainerStyle={{ paddingBottom: insets.bottom + 45 }}
              //refreshControl={
              //  <RefreshControl
              //    refreshing={isLoading}
              //    onRefresh={() => queryClient.invalidateQueries({ queryKey: ['leaderboard'] })}
              //    progressViewOffset={20}
              //  />
              //}
            >
                {data.slice(3).map((value, i) => (
                  <Animated.View key={i} entering={FadeInDown.delay(i * 100).duration(1000).springify()} >
                    <TouchableOpacity 
                      style={tw`flex-row relative py-0.5 w-full`}
                      onPress={() => {
                        setSelectedUser(value);
                        setModalOpen(true);
                      }}
                    >
                      <View style={tw`h-full w-[${
                              (value.todays_points / data[0].todays_points) * 100
                          }%] bg-blue-500 bg-opacity-30 shadow-sm absolute`} 
                      />
                      <View 
                        style={tw`flex-row relative shadow-sm gap-4 py-4 px-4 items-center w-full`} 
                      >
                          <Text style={tw`text-slate-50 text-sm`}>{i + 4}</Text>

                          {
                            value.lottie? (
                              <View style={tw`h-10 w-10 rounded-full mx-auto`}>
                                <LottieView
                                  source={{ uri: value.lottie }}
                                  style={tw`h-full w-full`}
                                  loop={true}
                                  autoplay={true}
                                  speed={1}
                                />
                              </View>
                            ):(
                              <Image 
                                source={{ uri: value.pic }} 
                                style={tw`h-10 w-10 rounded-full mx-auto`}
                              />
                            )
                          }

                          <Text style={tw`text-slate-50 flex-1 font-semibold`}>{value.username}</Text>
                          <Text style={tw`text-slate-50 text-sm bg-opacity-80 my-auto bg-blue-600 rounded-full px-3`}>
                            {value.todays_points}
                          </Text>
                      </View>
                    </TouchableOpacity>
                    </Animated.View>
                ))}
            </ScrollView>
          </View>

{/* ================PROFILE MODAL================ */}
          <ProfileModal
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            selectedUser={selectedUser}
          />

        </SafeAreaView>
        <BottomNavBar/>
      </View>
        
    );
}