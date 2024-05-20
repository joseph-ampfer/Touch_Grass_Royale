import { View, Text, Image, TouchableOpacity, BackHandler, Pressable, ActivityIndicator, } from 'react-native';
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
  queryEvents, queryAndAggregateUsageStats
} from '@brighthustle/react-native-usage-stats-manager';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView, Gesture, GestureDetector, ScrollView, TouchableWithoutFeedback, Directions } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import Animated, { BounceIn, useSharedValue, useAnimatedStyle, withSpring, withTiming, FadeInLeft, FadeInUp, FadeInRight, FadeInDown, FadeOutDown, FadeOutUp, FadeIn, FadeOut } from 'react-native-reanimated'
import MessagesContainer from '../components/MessagesContainer';
import BottomNavBar from '../components/BottomNavBar';
import Modal from 'react-native-modal';
import { Portal } from 'react-native-portalize';
import ProfileModal from '../components/ProfileModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLeaderboard, pointsCheckWinner, sendMessage, updatePoints } from '../apiFetches/fetches';
import toOrdinal from '../functions/toOrdinal';
import { hoursRemaining } from '../functions/hoursRemaining';
import MagicalError from '../components/MagicalError';
import { storage } from '../Storage';
import { calculatePoints, end, endTime, timezone } from '../functions/calculatePoints';
import PopUp from '../components/PopUp';
import MessageBubble from '../components/MessageBubble';
// import { hello } from '../modules/my-usage-stats-module';

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

export default function HomeScreen({ navigation }) {
  const my_id = storage.getNumber('my_id');

  
  // check winner function
  const checkWinner = async () => {
    const now = new Date();
    const utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
    const storedDate = storage.getString('dateCheck');
    console.log('utc: ', utc);
    console.log('storedDate: ', storedDate);
    if (utc !== storedDate) {
      // check server for winner
      try {
        const result = await pointsCheckWinner();
        console.log(result)
        if (!result.winner) {
          return
        } else {
          setPopTitle('Congratulations!!!');
          setPopMsg(`You finished in ${toOrdinal(result.rank)} place and earned ${result.gems} gems!`);
          setPopOkMsg('Nice');
          setPopOkFn(() => () => {
            setPopUpOpen(false);
            setShowFireworks(true);
          })
          setPopUpOpen(true);
        }

      } catch (error) {
        console.error(error.detail || error.message);
      }

      // store now in 'dateCheck'
      storage.set('dateCheck', utc)
    } 
  }
  useEffect(() => {
    checkWinner()
  }, [])
  const [showFireworks, setShowFireworks] = useState(false);
  playFireworks = () => {
    this.fireworks.play();
  }
   
  
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  })

  const queryClient = useQueryClient()
  const updatePointsFn = useMutation({
    mutationFn: (points) => updatePoints(points),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
      console.log('Updated points from HomeScreen');
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })
  
  // Handling error state to navigate
  useEffect(() => {
    if (isError) {
      if (error.detail == 'Signature has expired') {
        navigation.navigate('Login3', {expired: true});
      } else {
        console.error(error.detail)
      }
    }
  }, [isError, error, navigation]); // Include all dependencies used in the effect

  

  const insets = useSafeAreaInsets();
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const fling = Gesture.Fling();

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('')
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popOkFn, setPopOkFn] = useState(null);

  const [timeVisible, setTimeVisible] = useState(false);

// =========GETTING USAGE STAT PERMISSION ON SCREEN LOAD===========
  useEffect(() => {
    // Consider delaying the permission check until after initial engagement
    const checkPermission = async () => {
      const hasPermission = await checkForPermission();
      if (!hasPermission) {
        // Inform the user about why the permission is needed before showing settings
        //alert('We need your permission to access usage stats to keep score! Please grant permission in settings.');
        setPopTitle("Access Required");
        setPopMsg("To calculate your screen time and convert it to points, enable usage access. Settings will open automatically upon signing up or logging in.");
        setPopOkFn(() => () => setPopUpOpen(false));
        setPopOkMsg("OK");
        setPopUpOpen(true);
        showUsageAccessSettings('');
      }
    };

    // Delay the permission check to not interrupt the user immediately
    setTimeout(checkPermission, 10000); // 10 seconds, adjust as needed
  }, []);


  // ===================FETCH USAGE STATS======================
  async function fetchUsageStats() {

    const points = await calculatePoints();
    const now = new Date();
    updatePointsFn.mutate({ points: points, date: now.toISOString() })
    
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


  const [selectedMessageId, setSelectedMessageId] = useState(null);
  // Dummy data for messages
  const messages = [
    { id: 'msg1', text: 'Touch grass bro' },
    { id: 'msg2', text: 'Initiate lawn inspection' },
    { id: 'msg3', text: "You're in last place..." },
    { id: 'msg4', text: 'Perhaps you might benefit from a tactile reunion with natures carpet' },
    { id: 'msg5', text: 'Engage in an organic surface encounter' },
    { id: 'msg6', text: "Undertake an audit of the earth's exterior layer" },
    { id: 'msg7', text: 'Activate your primal ground sensors' },
    { id: 'msg8', text: 'Eyes up, screens down' },
    { id: 'msg9', text: "If you ain't first, you're last" },
    { id: 'msg10', text: "Touch grass, please" },
    { id: 'msg11', text: "Ooga booga" },
  ];

  // FINDING CURRENT USER FROM DATA
  const [lastPlace, setLastPlace] = useState(null)
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
            setUser(data[i]);
            setLastPlace(data[data.length - 1]);
            break;
          }
        }
      }
    }, [data])

  const sendMessageFn = useMutation({
    mutationFn: (info) => sendMessage(info),
    onSuccess: () => {
      setPortalOpen(false);
      setPopTitle('Sent');
      setPopMsg('Notification sent successfully :)')
      setPopOkMsg('OK')
      setPopOkFn(() => () => setPopUpOpen(false))
      setPopUpOpen(true);
      setSelectedMessageId(null);
    },
    onError: (error) => {
      if (error.detail == "User is not registered for push notifications") {
        setPortalOpen(false);
        setPopTitle(`Couldn't send`);
        setPopMsg(`${lastPlace.username} is not registered to recieve notifications :(`)
        setPopOkMsg('OK')
        setPopOkFn(() => () => setPopUpOpen(false))
        setPopUpOpen(true);
        setSelectedMessageId(null);
      }
      console.error(error, error.detail)
    }
  })


  
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
          <View style={[tw`mx-5 h-14/100  rounded-3xl justify-center mt-2 `, ]}>
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
          <View style={[tw`mx-5 h-34.9/100 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >
          </View>
  
  {/* ==============USERS own line=============== */}
         <View style={[tw`mx-5 h-6.8/100 flex rounded-2xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >
          </View>
  
  {/* ==============users stats=============== */}
            <View style={tw`mt-5 flex-row mx-5 justify-between h-14/100`}>
              <View style={[tw`h-full w-48.5/100 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
  {/* ===============hours remaining================ */}
              <View style={[tw`h-full w-48.5/100 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
            </View>
  
  {/*==============notify loser=============== */}
            <View style={[tw`mx-5 mt-5 h-6.8/100 flex rounded-2xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            </View>
    
        </View>

  {/* ============BOTTOM NAV-BAR========== */}
      <BottomNavBar/>
    
      </View>

    )
  }

  if (isError) {
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
          <View style={[tw`mx-5 h-14/100  rounded-3xl justify-center mt-2 `, ]}>
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
          <View style={[tw`mx-5 h-34.9/100 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >
          </View>
  
  {/* ==============USERS own line=============== */}
         <View style={[tw`mx-5 h-6.8/100 flex rounded-2xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
          >
          </View>
  
  {/* ==============users stats=============== */}
            <View style={tw`mt-5 flex-row mx-5 justify-between h-14/100`}>
              <View style={[tw`h-full w-48.5/100 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
  {/* ===============hours remaining================ */}
              <View style={[tw`h-full w-48.5/100 flex rounded-3xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
              </View>
            </View>
  
  {/*==============notify loser=============== */}
            <View style={[tw`mx-5 mt-5 h-6.8/100 flex rounded-2xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
            </View>
    
        </View>

  {/* ============BOTTOM NAV-BAR========== */}
      <BottomNavBar/>
    
    </View>

    )
  }

  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <Image 
        blurRadius={70} 
        source={require('../assets/images/full.png')} 
        style={tw`w-full h-full absolute`} 
      />
      <View style={[tw`flex-1`, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
{/* =============TOP BAR============== */}
        <View style={tw`flex-row justify-between content-center mx-5 mb-1 `}>
          <View style={tw``}>
            {/* Touch Grass Royale
               */}
            <Image source={require('../assets/images/newGrassLogo (7).png')} style={tw`w-64 h-8 `}  />
          </View>
          <View  style={tw`flex-row  items-end`}>
            <Text style={tw`text-white font-bold text-2xl mr-2 `}>{user?.gems?.toLocaleString()}</Text>
            <FontAwesome5 style={tw` text-2xl`} name="gem"  color="white" />
          </View>
          {/* <Animated.View entering={FadeInRight.duration(1000).springify()} style={tw`flex-row`}>
            <Text style={tw`text-white font-bold text-2xl mr-2 `}>{user?.gems}</Text>
            <FontAwesome5 style={tw`mb-2 pt-1`} name="gem" size={24} color="white" />
          </Animated.View> */}
        </View>
{/* =========CURRENT WINNER======== */}
        <Animated.View entering={FadeInDown.duration(1000).springify()} style={[tw`mx-5 h-15/100  rounded-3xl justify-center mt-2`, ]}>
          <View style={tw``}>
            <View style={tw`flex-row justify-center items-center`} >
              {/* pic and stats */}
              <View style={tw`mx-10 self-center mt-4`}>
                {
                  data[0].lottie? (
                    <View style={tw`h-22 w-22 rounded-full mx-auto`}>
                    <LottieView 
                        source={{ uri: data[0].lottie }} 
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
          style={[tw`mx-5 h-34.9/100 flex rounded-3xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
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
                                source={{ uri: user.lottie }}
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

                        <Text 
                          numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={tw`text-slate-50 flex-1 font-semibold`}
                        >
                          {user.username}
                        </Text>
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
          style={[tw`mx-5 h-6.8/100 flex rounded-2xl mt-5 overflow-hidden`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
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
                          source={{ uri: user.lottie }}
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
          <View style={tw`mt-5 flex-row mx-5 justify-between h-14/100`}>
          {
            user?.rank === data.length? (
              <Animated.View entering={FadeInLeft.delay(400).duration(1000).springify()} style={[tw`h-full w-48/5/100 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
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
              <Animated.View entering={FadeInLeft.delay(400).duration(1000).springify()} style={[tw`h-full w-48.5/100 flex rounded-3xl justify-center `, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
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
              {
                timeVisible ? (
                  <Pressable 
                    style={tw`flex-col items-center justify-center flex-grow`}
                    onPress={() => setTimeVisible(!timeVisible)}
                  >
                    <Text style={tw`font-bold text-white/80 text-3xl text-center px-2`}>
                      {endTime}
                    </Text>
                    <Text style={tw`font-semibold text-white/50 mt-1`}>End time {timezone}</Text>
                  </Pressable>
                ):(
                  <Pressable 
                    style={tw`flex-row justify-center items-center w-full h-full`}
                    onPress={() => setTimeVisible(!timeVisible)}
                  >
                    <View style={tw`flex-row justify-center items-center  h-full  `}>
                      <Text style={[tw`font-bold text-white/80 text-6xl pt-3 mr-1.5  `, ]}>{hoursRemaining()}</Text>
                    </View>
                    <View style={tw`flex-col ml-1.5 `} >
                      <Text style={tw` font-semibold text-white/50  text-base `}>{hoursRemaining() == 1 ? 'hour':'hours'}</Text>
                      <Text style={tw` font-semibold text-white/50  text-left  pb-1`}>remaining</Text>
                    </View>
                  </Pressable>
                )
              }

            </Animated.View>
          </View>

{/*==============notify loser=============== */}
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={[tw`mx-5 mt-5 h-6.8/100 flex rounded-2xl justify-center`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
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
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}  style={tw`flex-1 flex-col justify-end bg-black/50`}>
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
                {
                  sendMessageFn.isPending? (
                    <View style={tw`absolute bottom-4 right-15`}>
                      <ActivityIndicator />
                    </View>
                  ):(
                    <TouchableOpacity 
                      style={tw`absolute bottom-3 right-13`}
                      onPress={() => selectedMessageId? (
                        sendMessageFn.mutate({ id: lastPlace.id, title: user?.username, message: messages.find(msg => msg.id == selectedMessageId).text })
                      ):null }
                    >
                      <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()} 
                        style={tw`border-sky-800 border p-1 px-3 rounded-lg`}>
                        <Ionicons name="send-sharp" size={22} color="white" />
                      </Animated.View>
                    </TouchableOpacity>
                  )
                }
              </View>
              {/* SCROLL CONTENT */}
              <View style={tw`flex-1 bg-black`}>
                <ScrollView>
                  <View>
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message.text}
                        isSelected={message.id === selectedMessageId}
                        onPress={() => setSelectedMessageId(message.id)}
                      />
                    ))}
                  </View>
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

{/* =========FIREWORKS=========== */}
        {
          showFireworks && (
            <View style={tw`absolute h-full w-full  `}>
            <LottieView 
              ref={animation => {
                this.fireworks = animation;
              }}
              source={require('../assets/animations/fireworks.json')}
              style={{width:'100%', height:'100%'}}
              loop={false}
              autoPlay
              onAnimationFinish={() => setShowFireworks(false)}
            />
          </View>
          )
        }

      </View>

{/* POPUP */}
      <PopUp
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title={popTitle} 
        message={popMsg}
        OKmsg={popOkMsg}
        OKfn={popOkFn}
      />

{/* ============BOTTOM NAV-BAR========== */}
    <BottomNavBar/>
  
    </View>
    </GestureHandlerRootView>
  )
}