import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {
  EventFrequency,
  checkForPermission,
  queryUsageStats,
  showUsageAccessSettings,
  queryEvents
} from '@brighthustle/react-native-usage-stats-manager';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import Animated, { BounceIn, useSharedValue, useAnimatedStyle, withSpring, withTiming, FadeInLeft } from 'react-native-reanimated'
import MessagesContainer from '../components/MessagesContainer';
import BottomNavBar from '../components/BottomNavBar';

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

export default function HomeScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

   

// =========GETTING USAGE STAT PERMISSION ON SCREEN LOAD===========
  useEffect(() => {
    // Consider delaying the permission check until after initial engagement
    const checkPermission = async () => {
      const hasPermission = await checkForPermission();
      if (!hasPermission) {
        // Inform the user about why the permission is needed before showing settings
        alert('We need your permission to access usage stats to provide personalized insights. Please grant permission in the next screen.');
        showUsageAccessSettings('');
      }
    };

    // Delay the permission check to not interrupt the user immediately
    setTimeout(checkPermission, 10000); // 10 seconds, adjust as needed
  }, []);




  // ===================FETCHING THE STATS======================
  async function fetchUsageStats() {
    // Get current date
    const currentDate = new Date();

    // Set start time to beginning of the current day (00:00:00)
    const startOfDay = new Date(currentDate.setHours(0, 0 , 0, 0));

    // Set end time to the end of the current day (23:59:59)
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
  
    // Convert to milliseconds since UNIX epoch
    const startMilliseconds = startOfDay.getTime();
    const endMilliseconds = endOfDay.getTime();
    const currentMilliseconds = currentDate.getTime();
  
    // Query usage stats for the current day
    // const result = await queryUsageStats(
    //   EventFrequency.INTERVAL_DAILY,
    //   startMilliseconds,
    //   endMilliseconds
    // );

    const events = await queryEvents(
      startMilliseconds,
      currentMilliseconds
    )
  
    // Do something with 'result', like analyzing a well-prepared slide under the microscope
    //console.log(result);
    console.log('==============================================================')
    console.log(events)

    // const totalScreenTime = Object.values(result).reduce((total, app) => {
    //   return total + app.totalTimeInForeground;
    // }, 0);

    // console.log(totalScreenTime, 'screen time total=======================================');

    // for (let key in result ) {
    //   console.log(key)
    //   console.log(result[key]['totalTimeInForeground'])
    // }
    
    let total = 0;
    for (let key in events) {
      console.log(events[key]['name'])
      console.log(events[key]['humanReadableUsageTime'])
      total += events[key]['usageTime']
    }

    let minutesOnPhone = total/60000
    //let possiblePoints = currentDate.getMinutes();
    const now = new Date();
    const elapsedMilliseconds = now - startOfDay;
    const totalMinutes = (elapsedMilliseconds / 60000)
    const points = totalMinutes - minutesOnPhone

    console.log(total)
    console.log(Math.floor(minutesOnPhone), 'minutes of phone use')
    console.log(Math.floor(totalMinutes), 'minutes in day?')
    console.log(Math.floor(points), 'total points')
  }
  


  useEffect(() => {
  fetchUsageStats();
  // You might also want to handle the cleanup or specify dependencies here
}, []); // Empty dependency array means this effect runs only on component mount


useEffect(() => {
  if (modalizeRef.current) {
    console.log("==========Mounted===============");
  }
}, [modalizeRef.current]);

  
  

// ====================SCREEN========================
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
      <SafeAreaView style={tw`flex-1`}>
{/* =========TOP BAR======== */}
        <View style={tw`flex-row justify-between content-center mx-5 `}>
          {/* <TouchableOpacity>
            <Ionicons style={tw`ml-5`} name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity> */}
          <View>
            <Text style={[tw`text-center font-bold text-2xl text-white  mb-2`, {fontFamily: ''}]}>
              Touch Grass Royale
              </Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={tw`text-white font-bold text-2xl mr-2 `}>{'0'}</Text>
            <FontAwesome5 style={tw`mb-2 pt-1`} name="gem" size={24} color="white" />
          </View>
        </View>
{/* =========CURRENT WINNER======== */}
        <View style={[tw`mx-5 h-29 flex rounded-3xl justify-center mt-2`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
          <View style={tw``}>
            <View style={tw`flex-row justify-between`} >
              {/* pic and stats */}
              <View style={tw`mx-10 self-center`}>
                <Image 
                  source={{ uri: data[0].pic }} 
                  style={tw`h-16 w-16 rounded-full mx-auto`}
                />
                <Text style={tw`text-slate-50 font-semibold text-center py-1`}>{data[0].name}</Text>
              </View>
              <View style={tw`flex-2 justify-center `}>
                <Text style={tw`font-bold text-lg text-white mr-5 text-center`}>{data[0].name} is winning with {data[0].time} points, try to catch up! </Text>
              </View>
            </View>
          </View>
        </View>

{/* =========leaderboard preview========= */}
        <TouchableOpacity 
          style={[tw`mx-5 h-72 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          onPress={() => navigation.navigate('Leaderboard')}
        >

            <View style={tw`flex-1    `}>
              {data.slice(0,5).map((value, i) => (
                  <View 
                    style={tw`flex-row relative py-0.25 w-full`}
                    key={i}
                  >
                    <View style={tw`h-full rounded-r-2xl w-[${
                            (value.time / data[0].time) * 100
                        }%] bg-blue-500 bg-opacity-40  absolute`} 
                    />
                    <View style={tw`flex-row relative  gap-4 py-2 px-4 items-center w-full`}>
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

          </TouchableOpacity>

{/* ==============users stats=============== */}
          <View style={tw`mt-5 flex-row mx-5 justify-between`}>
            <View style={[tw`h-29 w-45 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              <View style={tw``}>
                <Animated.Text entering={BounceIn.duration(1000).delay(100)} style={tw`text-center font-bold text-white text-3xl mb-2`}>7th Place</Animated.Text>
                <Text style={tw`text-center font-semibold text-white/50 `}>200 points</Text>
              </View>
            </View>
{/* ===============hours remaining================ */}
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

{/*==============notify loser=============== */}
          <View style={[tw`mx-5 mt-5 h-19 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            <TouchableOpacity 
              style={tw`w-full h-full flex-row justify-between items-center`}
              onPress={() => {
                console.log(modalizeRef);
                if (modalOpen) {
                  modalizeRef.current?.close();
                } else {
                  modalizeRef.current?.open();
                }
              }}
            >
            <View style={tw`h-15 w-15`}>
                {/* <LottieView 
                    source={require('../assets/animations/arrows.json')} 
                    style={{width:'100%', height:'100%', transform: [{rotate: '-90deg'}]}}
                    autoPlay 
                    loop 
                    speed={1}
                /> */}
              </View>
              <View style={tw`justify-center`}>
                <Text style={tw`text-center  text-white/90 text-sm font-semibold`}>Tell last place they need to touch grass.</Text>
              </View>
              <View style={tw`h-15 w-15 `}>
                {/* <LottieView 
                    source={require('../assets/animations/arrows.json')} 
                    style={{width:'100%', height:'100%', transform: [{rotate: '90deg'}]}}
                    autoPlay 
                    loop 
                    speed={1}
                /> */}
              </View>
            </TouchableOpacity>
          </View>
          <View style={[tw`mx-5 mt-5 h-10 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
{/* ==============TODO=============== */}
            <TouchableOpacity style={tw`flex-1`}>
              <Text>press me</Text>
            </TouchableOpacity>
          </View>

  
        

{/* ======================MODAL==================== */}
          <Modalize 
            ref={modalizeRef}
            onOpen={() => setModalOpen(true)}
            onClose={() => setModalOpen(false)}
            modalHeight={600}
            snapPoint={600}
            scrollViewProps={{ showsVerticalScrollIndicator: false, }}
          >
          
          <View style={tw`bg-gray-800 rounded-t-xl overflow-hidden`}>
            <View style={tw`pt-4 pb-4 relative`}>
              <Text style={tw`font-bold text-center text-xl text-white/90`}>
                {'Choose a Message'}
              </Text>
              <TouchableOpacity style={tw`absolute bottom-4 right-13`}>
                <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()}>
                  <Ionicons name="send-sharp" size={22} color="white" />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View style={tw`mb-2`}>
              <MessagesContainer/>
            </View>
          </View>
          </Modalize>

      </SafeAreaView>

{/* ============BOTTOM NAV-BAR========== */}
    <BottomNavBar/>
  
    </View>
    </GestureHandlerRootView>
  )
}