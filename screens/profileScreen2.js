import { View, Text, Image, Pressable, BackHandler } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, GestureHandlerRootView, TouchableOpacity, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';
//import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Modalize, useModalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeOut, FadeOutDown } from 'react-native-reanimated';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LottieAvatarShop from '../components/LottieAvatarShop';


const data = [
    {
      name: 'John Doe1',
      time: '500',
      pic: 'https://i.pravatar.cc/600/',
      lottie: 'pikachu'
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


export default function ProfileScreen2({ navigation }) {
  const [portalOpen, setPortalOpen] = useState(false);
  const fling = Gesture.Fling();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select an image.');
    }
  };

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


  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>
      <Image blurRadius={30} source={require('../assets/images/star (4).png')} style={tw`w-full h-full absolute`} />
        
{/* ===========PICTURE ROW========= */}
        <View style={tw`flex-row items-center justify-around mt-10`}>
          <TouchableOpacity 
            style={tw`flex-col items-center justify-center w-16 `}
            onPress={() => navigation.navigate('Friends', { userID: "TODO", isCurrentUser: true } )}
          >
            <Text style={tw`text-white font-bold text-xl`}>52</Text>
            <Text style={tw`text-slate-400 font-semibold`}>Friends</Text>
          </TouchableOpacity>
          {
            !data[0].lottie? (
              <View style={tw`h-36 w-36 rounded-full`}>
                <LottieView 
                    source={require('../assets/animations/ghibliGirl.json')} 
                    style={{width:'100%', height:'100%'}}
                    autoPlay 
                    loop 
                    speed={1}
                />
              </View> 
            ):(
              <Image 
              source={require('../assets/animations/ghibliGirlGif.gif')} 
              style={tw`h-36 w-36 rounded-full `}
            />
            )
          }
          <View style={tw`flex-col items-center justify-center w-16`}>
            <Text style={tw`text-white font-bold text-xl`}>0</Text>
            <Text style={tw`text-slate-400 font-semibold`}>Gems</Text>
          </View>
        </View>
        {/* NAME AND EDIT */}
        <View style={tw`flex-col justify-center items-center mb-5 `}>
          <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{data[6].name}</Text>
          <TouchableOpacity onPress={()=> alert("Edit your profile.")}>
            <Text style={tw`text-slate-500 `}>Edit profile</Text>
          </TouchableOpacity>
        </View>

{/* =============TROPHIES============== */}
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

{/* =============CURRENT RANK============= */}
        <Text style={tw`text-gray-100 text-lg font-semibold ml-5 mb-3 mt-5`}>Current Rank</Text>
        <View style={tw`flex-col justify-center items-center`}>
          <Image style={tw`h-25 w-25`} source={require('../assets/images/noob.png')} />
          <Text style={tw`text-white text-base font-bold`}>Noob</Text>
        </View>

        <View style={tw`mx-5 h-10 border-2 border-slate-200 rounded-lg mt-3`}>
          <View style={[tw`bg-zinc-700 rounded-md h-full   w-[${
                            (4123 / 5000) * 100
                        }%]`]}>
            <Image blurRadius={20} source={require('../assets/images/progressBar.png')} style={tw`w-full h-full rounded-md -z-50`} />
          </View>
          <Text style={tw`text-white text-base text-center`}>4123/5000</Text>
        </View>

        
{/* =============TOTAL POINTS============= */}
        <View style={tw` mt-12 ml-5 `}>
         <Text style={tw`text-gray-100 text-lg font-semibold `}>Total points:</Text>
         <Text style={tw`text-white text-2xl  font-bold`}> 3,458 pts</Text>
        </View>

        <Pressable onPress={() => setPortalOpen(true)}>
          <Text style={tw`text-white`}>open picker</Text>
        </Pressable>


{/* ===============MODAL============= */}
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
            
            {/* MAIN MODAL, HEADER BELOW */}
            <Animated.View 
              entering={FadeInDown.duration(1000).springify()}
              exiting={FadeOutDown.duration(1000).springify()} 
              style={tw` h-2/3 w-full `}>
              
              {/* HEADER */}
              <View style={tw`pt-4 pb-4 relative bg-gray-800 rounded-t-2xl `}>
                <Text style={tw`font-bold text-center text-xl text-white/90`}>
                  Avatar Store
                </Text>
                {/* <TouchableOpacity style={tw`absolute -bottom-1 right-13`}>
                  <Animated.View entering={FadeInLeft.delay(500).duration(500).springify()} 
                    style={tw`border-sky-800 border p-1 px-3 rounded-lg`}>
                    <Ionicons name="send-sharp" size={22} color="white" />
                  </Animated.View>
                </TouchableOpacity> */}
              </View>
              
              {/* SCROLL CONTENT */}
              <View style={tw`flex-1 bg-gray-800 `}>
                <LottieAvatarShop />
              </View>

            </Animated.View>

          </Animated.View>
          
          </GestureDetector>
        </Portal>
      ):null
    }


      </SafeAreaView>
      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}