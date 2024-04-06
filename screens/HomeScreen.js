import { View, Text, Image, TouchableOpacity, BackHandler, } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {
  EventFrequency,
  checkForPermission,
  queryUsageStats,
  showUsageAccessSettings,
  queryEvents
} from '@brighthustle/react-native-usage-stats-manager';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView, Gesture, GestureDetector, ScrollView, TouchableWithoutFeedback, Directions } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import Animated, { BounceIn, useSharedValue, useAnimatedStyle, withSpring, withTiming, FadeInLeft, FadeInUp, FadeInRight, FadeInDown, FadeOutDown, FadeOutUp, FadeIn, FadeOut } from 'react-native-reanimated'
import MessagesContainer from '../components/MessagesContainer';
import BottomNavBar from '../components/BottomNavBar';
import animations from '../animations/animations';
import Modal from 'react-native-modal';
import { Portal } from 'react-native-portalize';
import ProfileModal from '../components/ProfileModal';
import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard } from '../api/fetches';
import toOrdinal from '../functions/toOrdinal';
import hoursUntilMidnight from '../functions/hoursTillMidnight';
import MagicalError from '../components/MagicalError';

// const data = [
//   {
//     name: 'JohnDoe1',
//     todays_points: '524',
//     pic: 'https://i.pravatar.cc/600/',
//     lottie: 'spaceJam'
//   },
//   {
//     name: 'Hexscuseme',
//     todays_points: '500',
//     pic: 'https://i.pravatar.cc/60',
//     lottie: 'gojoCat'
//   },
//   {
//     name: 'Nephlauxic',
//     todays_points: '499',
//     pic: 'https://i.pravatar.cc/60/68',
//     lottie: null
//   },
//   {
//     name: 'Hobbes',
//     todays_points: '461',
//     pic: 'https://i.pravatar.cc/60/63',
//     lottie: 'eyeBlob'
//   },
//   {
//     name: 'eener_weiner',
//     todays_points: '444',
//     pic: 'https://i.pravatar.cc/60/64',
//     lottie: null
//   },
//   {
//     name: 'Test test 6',
//     todays_points: '443',
//     pic: 'https://i.pravatar.cc/60/65',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'jampfer',
//     todays_points: '411',
//     pic: 'https://i.pravatar.cc/60/66',
//     lottie: 'eyeBlob'
//   },
//   {
//     name: 'Test test 2',
//     todays_points: '400',
//     pic: 'https://i.pravatar.cc/60/67',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 3',
//     todays_points: '399',
//     pic: 'https://i.pravatar.cc/60/69',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 4',
//     todays_points: '350',
//     pic: 'https://i.pravatar.cc/60/70',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 5',
//     todays_points: '300',
//     pic: 'https://i.pravatar.cc/60/80',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 6',
//     todays_points: '100',
//     pic: 'https://i.pravatar.cc/60/90',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 1',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/10',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 2',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/20',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 3',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/30',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 4',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/40',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 5',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl'
//   },
//   {
//     name: 'Test test 6',
//     todays_points: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl'
//   },
// ]


// const user = {
//   name: 'jampfer',
//   todays_points: '100',
//   pic: 'https://i.pravatar.cc/60/66',
//   gems: 1
// }
const my_id = 32;

export default function HomeScreen({ navigation }) {
  
  const {data, isLoading, error} = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  })
  
  
  // FINDING CURRENT USER FROM DATA
  const [user, setUser] = useState({
    name: 'jampfer',
    todays_points: '100',
    pic: 'https://i.pravatar.cc/60/66',
    gems: 1,
    rank: 3
  });
   useEffect(() => {
     if (data) {
       for (let i = 0; i < data.length; i++) {
         if (data[i].id === my_id) {
           setUser(data[i])
           break;
         }
       }
     }
   }, [data])



  const insets = useSafeAreaInsets();
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const fling = Gesture.Fling();

  
   
// =========GETTING USAGE STAT PERMISSION ON SCREEN LOAD===========
  useEffect(() => {
    // Consider delaying the permission check until after initial engagement
    const checkPermission = async () => {
      const hasPermission = await checkForPermission();
      if (!hasPermission) {
        // Inform the user about why the permission is needed before showing settings
        alert('We need your permission to access usage stats to keep score! Please grant permission in settings.');
        showUsageAccessSettings('');
      }
    };

    // Delay the permission check to not interrupt the user immediately
    setTimeout(checkPermission, 10000); // 10 seconds, adjust as needed
  }, []);


  // ===================FETCH USAGE STATS======================
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
    console.log(JSON.stringify(events, null, 2))

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
  
  //=============CALLING FETCH USAGE ON SCREEN MOUNT=========
  useEffect(() => {
  fetchUsageStats();
  // You might also want to handle the cleanup or specify dependencies here
  }, []); // Empty dependency array means this effect runs only on component mount


//===============BACK ACTION FOR PORTAL================
  useEffect(() => {
    const backAction = () => {
      if (portalOpen) {
        setPortalOpen(false);
        return true;
      }
      return false; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [portalOpen]);

  
  if (isLoading) {
    return (
      <View style={tw`flex-1`}>
        <StatusBar style='light' />
        <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
        <View style={[tw`flex-1`, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
  {/* =============TOP BAR============== */}
          <View style={tw`flex-row justify-between content-center mx-5 mb-1`}>
            <Animated.View entering={FadeInLeft.duration(1000).springify()} >
              <Image source={require('../assets/images/Touch Grass (1).png')} style={tw`w-65 h-8 `}  />
            </Animated.View>
            <View style={tw`flex-row mb-2`}>
              
            </View>
          </View>
  {/* =========CURRENT WINNER======== */}
          <View style={[tw`mx-5 h-29  rounded-3xl justify-center mt-2`, ]}>
            <View style={tw``}>
              <View style={tw`flex-row justify-center items-center`} >
                {/* pic and stats */}
                <View style={tw`mx-10 self-center mt-4`}>

                  <View style={tw`h-22 w-22 rounded-full mx-auto bg-white/20`}/>

                </View>

              </View>
            </View>
          </View>
  
  {/* =========leaderboard preview========= */}
          <View style={[tw`mx-5 h-72 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >

          </View>
  
  {/* ==============USERS own line=============== */}
         <View style={[tw`mx-5 h-14 flex rounded-2xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >
          </View>
  
  {/* ==============users stats=============== */}
            <View style={tw`mt-5 flex-row mx-5 justify-between`}>
              <View style={[tw`h-29 w-45 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
  {/* ===============hours remaining================ */}
              <View style={[tw`h-29 w-45 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
            </View>
  
  {/*==============notify loser=============== */}
            <View style={[tw`mx-5 mt-5 h-14 flex rounded-2xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            </View>
    
        </View>

  {/* ============BOTTOM NAV-BAR========== */}
      <BottomNavBar/>
    
      </View>

    )
  }

  if (error) {
    console.error("Failed loading leaderboard:", error, error.detail)
  }

  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
      <View style={[tw`flex-1`, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
{/* =============TOP BAR============== */}
        <View style={tw`flex-row justify-between content-center mx-5 mb-1`}>
          <View  >
            {/* Touch Grass Royale
               */}
            <Image source={require('../assets/images/Touch Grass (1).png')} style={tw`w-65 h-8 `}  />
          </View>
          <Animated.View entering={FadeInRight.duration(1000).springify()} style={tw`flex-row`}>
            <Text style={tw`text-white font-bold text-2xl mr-2 `}>{user?.gems}</Text>
            <FontAwesome5 style={tw`mb-2 pt-1`} name="gem" size={24} color="white" />
          </Animated.View>
        </View>
{/* =========CURRENT WINNER======== */}
        <Animated.View entering={FadeInDown.duration(1000).springify()} style={[tw`mx-5 h-29  rounded-3xl justify-center mt-2`, ]}>
          <View style={tw``}>
            <View style={tw`flex-row justify-center items-center`} >
              {/* pic and stats */}
              <View style={tw`mx-10 self-center mt-4`}>
                {
                  data[0].lottie? (
                    <View style={tw`h-22 w-22 rounded-full mx-auto`}>
                    <LottieView 
                        source={animations[data[0].lottie]} 
                        style={{width:'100%', height:'100%'}}
                        autoPlay 
                        loop 
                        speed={1}
                    />
                  </View> 
                  ):(
                    <Image 
                    source={{ uri: data[0].pic }} 
                    style={tw`h-22 w-22 rounded-full mx-auto`}
                  />
                  )
                }

                <Text style={tw`text-slate-50 font-bold text-xl text-center pt-1`}>{data[0].username}</Text>
              </View>
              {/* <View style={tw`flex-2 justify-center `}>
                <Text style={tw`font-bold text-lg text-white mr-5 text-center`}>{data[0].username} is winning with {data[0].todays_points} points, try to catch up! </Text>
              </View> */}
            </View>
          </View>
        </Animated.View>

{/* =========leaderboard preview========= */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()} 
          style={[tw`mx-5 h-72 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
        >

            <View style={tw`flex-1`}>
              {
                data.slice(0,5).map((user, i) => (
                  <TouchableOpacity 
                    style={tw`flex-row relative py-0.25 w-full`}
                    key={user.id}
                    onPress={() => {
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                  >
                    <View style={tw`h-full rounded-r-2xl w-[${
                            (user.todays_points / data[0].todays_points) * 100
                        }%] bg-blue-500 bg-opacity-40  absolute`} 
                    />
                    <View style={tw`flex-row relative  gap-4 py-2 px-4 items-center w-full`}>
                        <Text style={tw`text-slate-50 text-sm`}>{i + 1}</Text>
                        {
                          user.lottie? (
                            <View style={tw`h-10 w-10 rounded-full  mx-auto`}>
                              <LottieView
                                source={animations[user.lottie]}
                                style={tw`h-full w-full `}
                                autoPlay
                                loop
                                speed={1}
                              />
                            </View>
                          ):(
                            <Image 
                            source={{ uri: user.pic }} 
                            style={tw`h-10 w-10 rounded-full mx-auto`}
                          />
                          )
                        }

                        <Text style={tw`text-slate-50 flex-1 font-semibold`}>{user.username}</Text>
                        <Text style={tw`text-slate-50 text-sm bg-opacity-80 my-auto bg-blue-600 rounded-full px-3`}>
                          {user.todays_points.toLocaleString()}
                        </Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>

        </Animated.View>

{/* ==============USERS own line=============== */}
       <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()} 
          style={[tw`mx-5 h-14 flex rounded-2xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
        >
          <View style={tw`flex-1`}>
            <TouchableOpacity 
              style={tw`flex-row relative py-0.25 w-full`}
              onPress={() => {
                setSelectedUser(user);
                setModalOpen(true);
              }}
            >
              <View style={tw`h-full rounded-r-2xl w-[${
                      (user?.todays_points / data[0].todays_points) * 100
                  }%] bg-blue-500 bg-opacity-40  absolute`} 
              />
              <View style={tw`flex-row relative  gap-4 py-2 px-4 items-center w-full`}>
                  <Text style={tw`text-slate-50 text-sm`}>{user?.rank}</Text>
                  {
                    user?.lottie? (
                      <View style={tw`h-10 w-10 rounded-full  mx-auto`}>
                        <LottieView
                          source={animations[user.lottie]}
                          style={tw`h-full w-full `}
                          autoPlay
                          loop
                          speed={1}
                        />
                      </View>
                    ):(
                      <Image 
                      source={{ uri: user?.pic }} 
                      style={tw`h-10 w-10 rounded-full mx-auto`}
                    />
                    )
                  }
                  <Text style={tw`text-slate-50 flex-1 font-semibold`}>{user?.username}</Text>
                  <Text style={tw`text-slate-50 text-sm bg-opacity-80 my-auto bg-blue-600 rounded-full px-3`}>
                    {user?.todays_points.toLocaleString()}
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>


{/* ==============users stats=============== */}
          <View style={tw`mt-5 flex-row mx-5 justify-between`}>
          {
            user?.rank === data.length? (
              <Animated.View entering={FadeInLeft.delay(400).duration(1000).springify()} style={[tw`h-29 w-45 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              <View style={tw``}>
                <Animated.Text 
                  entering={BounceIn.duration(1000).delay(100)} 
                  style={tw`text-center font-bold text-white text-3xl mb-1`}
                >
                    Last Place
                </Animated.Text>
                <Text style={tw`text-center font-semibold text-white/50`}>
                  {user?.todays_points.toLocaleString()} points
                </Text>
              </View>
            </Animated.View>
            ):(
              <Animated.View entering={FadeInLeft.delay(400).duration(1000).springify()} style={[tw`h-29 w-45 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
                <View style={tw``}>
                  <Animated.Text 
                    entering={BounceIn.duration(1000).delay(100)} 
                    style={tw`text-center font-bold text-white text-3xl mb-1`}
                  >
                      {toOrdinal(user?.rank)} Place
                  </Animated.Text>
                  <Text style={tw`text-center font-semibold text-white/50`}>
                    {user?.todays_points.toLocaleString()} points
                  </Text>
                </View>
              </Animated.View>
            )
          }

{/* ===============hours remaining================ */}
            <Animated.View entering={FadeInRight.delay(400).duration(1000).springify()} style={[tw`h-29 w-45 rounded-3xl `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              <View style={tw`flex-row justify-center items-center w-full h-full`}>
                <Text style={tw`font-bold text-white/80 text-6xl  h-12 mr-1.5  `}>{hoursUntilMidnight()}</Text>
                <View style={tw`flex-col ml-1.5`} >
                  <Text style={tw` font-semibold text-white/50  text-base `}>hours</Text>
                  <Text style={tw` font-semibold text-white/50  text-left  pb-1`}>remaining</Text>
                </View>
              </View>
            </Animated.View>
          </View>

{/*==============notify loser=============== */}
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={[tw`mx-5 mt-5 h-14 flex rounded-2xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            <TouchableOpacity 
              style={tw`w-full h-full flex-row justify-center items-center`}
              onPress={() => setPortalOpen(true)}
            >
              <View style={tw`justify-center`}>
                <Text style={tw`text-center  text-white/60 text-sm font-semibold`}>Tell last place they need to touch grass.</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

{/* ==============TODO=============== */}


{/* ======================MESSAGE MODAL/PORTAL==================== */}
        {
          portalOpen? (
        <Portal>
          <GestureDetector gesture={fling.direction(Directions.DOWN).onEnd(()=> setPortalOpen(false))}>
          {/* WHOLE SCREEN & BACKGROUND */}
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}  style={tw`flex-1 flex-col justify-end bg-black/40`}>
            {/* HANDLE */}
            <Animated.View entering={FadeInDown.duration(100).springify()} exiting={FadeOutDown.duration(1000).springify()} style={tw`flex-col justify-center items-center  pt-2 rounded-t-2xl`}>
              <View style={tw`bg-white rounded-full h-1 w-10 mb-2 `} />
            </Animated.View>
            {/* MAIN MODAL */}
            <Animated.View 
              entering={FadeInDown.duration(1000).springify()}
              exiting={FadeOutDown.duration(1000).springify()} 
              style={tw` h-2/3 w-full `}>
              {/* HEADER */}
              <View style={tw`pt-4 pb-4 relative bg-black rounded-t-2xl `}>
                <Text style={tw`font-bold text-center text-xl text-white/90`}>
                  Choose a Message
                </Text>
                <TouchableOpacity style={tw`absolute bottom-3 right-13`}>
                  <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()} 
                    style={tw`border-sky-800 border p-1 px-3 rounded-lg`}>
                    <Ionicons name="send-sharp" size={22} color="white" />
                  </Animated.View>
                </TouchableOpacity>
              </View>
              {/* SCROLL CONTENT */}
              <View style={tw`flex-1 bg-black`}>
                <ScrollView>
                  <MessagesContainer />
                </ScrollView>
              </View>
            </Animated.View>
          </Animated.View>
          </GestureDetector>
        </Portal>
          ):null
        }

{/* ================PROFILE MODAL================ */}
        <ProfileModal 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          selectedUser={selectedUser}
        />

      </View>

{/* ============BOTTOM NAV-BAR========== */}
    <BottomNavBar/>
  
    </View>
    </GestureHandlerRootView>
  )
}