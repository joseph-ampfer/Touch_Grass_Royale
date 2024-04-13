import { View, Text, Image, Pressable, BackHandler, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, GestureHandlerRootView, TouchableOpacity, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';
import Modal from 'react-native-modal';
import { Modalize, useModalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeOut, FadeOutDown } from 'react-native-reanimated';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LottieAvatarShop from '../components/LottieAvatarShop';
import { useQuery } from '@tanstack/react-query';
import { getSelf, googleCloudFetch } from '../apiFetches/fetches';
import toOrdinal from '../functions/toOrdinal';
import PicOrLottieModal from '../components/PicOrLottieModal';




const recentPlacements = [
  {
    date: '4/1/2024',
    rank: 5
  },
  {
    date: '3/31/2024',
    rank: 2
  },
  {
    date: '3/30/2024',
    rank: 13
  },
  {
    date: '3/29/2024',
    rank: 1
  },
  {
    date: '3/28/2024',
    rank: 3
  },
  {
    date: '3/27/2024',
    rank: 6
  },
  {
    date: '3/26/2024',
    rank: 21
  },
  {
    date: '3/25/2024',
    rank: 18
  },
  {
    date: '3/24/2024',
    rank: 3
  },
  {
    date: '3/23/2024',
    rank: 15
  },
]

export default function ProfileScreen2({ navigation }) {

  const { data: self, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  })

  

  const [pOLModalOpen, setPOLModalOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const fling = Gesture.Fling();


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
      <GestureHandlerRootView style={{ flex:1 }}>
      <View style={tw`flex-1 bg-black`}>
        <StatusBar style='light' />
        <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
        <SafeAreaView style={tw`flex-1`}>
          
  {/* ===========PICTURE ROW========= */}
          <View style={tw`flex-row items-center justify-around mt-1`}>

            {/* FRIENDS */}
            {/* <TouchableOpacity 
              style={tw`flex-col items-center justify-center w-16 `}
              onPress={() => navigation.push('Friends', { userID: self.id, isCurrentUser: true, username: self.username } )}
            >
              <Text style={tw`text-white font-bold text-xl`}>{self?.friends_count}</Text>
              <Text style={tw`text-slate-100 font-semibold`}>Friends</Text>
            </TouchableOpacity> */}

            {/* PIC OR LOTTIE */}
              <View style={tw`h-36 w-36  rounded-full bg-white/10 `}>
              </View>

            {/* GEMS */}
            {/* <View style={tw`flex-col items-center justify-center w-16`}>
              <Text style={tw`text-white font-bold text-xl`}>{self?.gems}</Text>
              <Text style={tw`text-slate-100 font-semibold`}>Gems</Text>
            </View> */}
          </View>


          {/* FULL NAME */}   
          <View style={tw`flex-col justify-center items-center mb-5 `}>
            <Text style={tw` mt-3 h-8 w-45 bg-white/10 rounded-2xl`}></Text>
            <Text style={tw` mt-2 h-5 w-30 bg-white/10 rounded-2xl`}></Text>
          </View>

          
          {/* BUTTONS: EDIT AND USE GEMS */}
          <View style={tw`flex-row justify-between mx-5 mb-3`}>
            <TouchableOpacity 
              style={tw`p-3 px-14  rounded-lg flex-row items-center justify-center bg-white/10`}
            >
              <Text style={tw`text-white/0 text-center`}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`p-3 px-14  rounded-lg flex-row items-center justify-center bg-white/10`}
            >
              <Text style={tw`text-white/0 text-center`}>Use gems</Text>
            </TouchableOpacity>
          </View>
  
  
    {/* body column */}
        <View style={tw`flex-col justify-between flex-grow mb-10 `}>
  
  {/* =============TROPHIES============== */}         
          <View style={tw`h-25 mx-5 bg-white/10 p-1 pt-2 rounded-2xl`}>

          </View>
  
  
  {/* =============CURRENT RANK============= */} 
            <View style={tw`h-60 mx-5 bg-white/10 p-2 rounded-2xl `}>               
            </View>
  
  {/* ==== =========PLACEMENTS LAST FEW DAYS============== */}
            <View style={tw`h-15`}>
            </View>
  
  {/* ========TOTAL POINTS====== */}
            <View style={tw` bg-white/10 p-2 h-10`}>   
            </View>
  
          </View>
     
        </SafeAreaView>
        <BottomNavBar/>
      </View>
      </GestureHandlerRootView>
    )
  }

  if (error) {
    console.error(error.detail)
  }

  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/images/full.png')} style={tw`w-full h-full absolute`} />
      <SafeAreaView style={tw`flex-1`}>
      {/* <Image blurRadius={30} source={require('../assets/images/star (4).png')} style={tw`w-full h-full absolute`} /> */}
        
{/* ===========PICTURE ROW========= */}
        <View style={tw`flex-row items-center justify-around mt-1`}>
          {/* FRIENDS */}
          <TouchableOpacity 
            style={tw`flex-col items-center justify-center w-16 `}
            onPress={() => navigation.push('Friends', { userID: self.id, isCurrentUser: true, username: self.username } )}
          >
            <Text style={tw`text-white font-bold text-xl`}>{self?.friends_count}</Text>
            <Text style={tw`text-slate-100 font-semibold`}>Friends</Text>
          </TouchableOpacity>
          {/* PIC OR LOTTIE */}
          {
            self?.lottie? (
              <View style={tw`relative`}>
                <View style={tw`h-36 w-36 rounded-full`}>
                  <LottieView 
                      source={animations[self?.lottie]} 
                      style={{width:'100%', height:'100%'}}
                      autoPlay 
                      loop 
                      speed={1}
                  />
                </View> 
                <TouchableOpacity 
                  style={tw`absolute -bottom-2 -right-1`} 
                  onPress={() => setPOLModalOpen(true)}>
                  <Ionicons name='add-circle-sharp' style={tw`text-white text-3xl`}  />
                </TouchableOpacity>
              </View>
            ):(
              <View style={tw`relative`}>
                <View style={tw`h-36 w-36 rounded-full `}>
                  <Image 
                    source={{ uri: self?.pic }} 
                    style={tw`h-36 w-36 rounded-full `}
                  />
                </View>
                <TouchableOpacity 
                  style={tw`absolute bottom-1 right-1 elevation-30 `} 
                  onPress={() => setPOLModalOpen(true)}>
                  <Ionicons name='add-circle-sharp' style={tw`text-white text-3xl `} />
                </TouchableOpacity>
              </View>
            )
          }
          {/* GEMS */}
          <TouchableOpacity 
            style={tw`flex-col items-center justify-center w-16`}
            onPress={() => alert('Finish in 1st, 2nd or 3rd place to earn gems.')}
          >
            <Text style={tw`text-white font-bold text-xl`}>{self?.gems}</Text>
            <Text style={tw`text-slate-100 font-semibold`}>Gems</Text>
          </TouchableOpacity>
        </View>
        {/* NAME OR FULL NAME */}
        {
          self.full_name? (
            <View style={tw`flex-col justify-center items-center mb-5 `}>
              <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{self?.username}</Text>
              <Text style={tw`text-white/80 text-base text-center mt-1`}>{self?.full_name}</Text>

            </View>
          ):(
            <View style={tw`flex-col justify-center items-center mb-5 `}>
              <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{self?.username}</Text>
              <TouchableOpacity style={tw`flex-row justify-center items-center mt-2`} onPress={()=> alert("Edit your profile.")}>
                <Text style={tw`text-white/40  mr-1`}>Edit profile</Text>
                <FontAwesome5 name='edit' style={tw`text-white/40 `} />
              </TouchableOpacity>
            </View>
          )
        }


        {/* BUTTONS: EDIT AND USE GEMS */}
        <View style={tw`flex-row justify-between mx-5 mb-3`}>
          <TouchableOpacity 
            style={tw`p-2 px-14 border-2 border-white/80 rounded-lg flex-row items-center justify-center`}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={tw`text-white text-center`}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`p-2 px-14 border-2 border-white/80 rounded-lg flex-row items-center justify-center`}
            onPress={() => {
              navigation.push('AvatarShop');
              //setPortalOpen(true)
            }}
          >
            <Text style={tw`text-white text-center`}>Use gems</Text>
          </TouchableOpacity>
        </View>


  {/* body column */}
      <View style={tw`flex-col justify-between flex-grow mb-10 `}>

{/* =============TROPHIES============== */}         
        <View style={tw`flex-row justify-evenly mx-5 bg-white/10 p-1 pt-2 rounded-2xl`}>
          <View style={tw`flex-col items-center `}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/first.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/second.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
          <View style={tw`flex-col items-center`}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/third.png')} />
            <Text style={tw`text-white text-lg font-bold`}>0</Text>
          </View>
        </View>


{/* =============CURRENT RANK============= */} 
          <View style={tw`flex-col items-center mx-5 bg-white/10 p-2 rounded-2xl `}>
            {/* <Image source={require('../assets/images/grass_bg.png')} style={tw`absolute h-full w-full -z-50`} /> */}
      
            <View style={tw`flex-col justify-center items-center mb-2`}>
             <Text style={tw`text-white text-4xl font-bold mb-2 underline `}>Noob</Text>
              <Image style={tw`h-25 w-25`} source={require('../assets/images/noob.png')} />
            </View>
          
            {/* PROGRESS BAR */}
          
            <View style={tw`w-full h-10 border-2 border-white/10 rounded-lg  mt-0`}>
              <View style={[tw`bg-zinc-700 rounded-md h-full  w-[${
                                (4123 / 5000) * 100
                            }%]`]}>
                <Image blurRadius={20} source={require('../assets/images/progressBar.png')} style={tw`w-full h-full rounded-md -z-50`} />
              </View>
            </View>
            <Text style={tw`text-white text-base  text-center`}>4,123/5,000 pts</Text>       
          </View>

{/* ==== =========PLACEMENTS LAST FEW DAYS============== */}
          <View style={tw``}>

            <ScrollView
              horizontal
              contentContainerStyle={tw`px-5`}
              showsHorizontalScrollIndicator={false}
            >
              {
                recentPlacements?.map((day, index) => {
                  return (
                    <Animated.View key={day.date} entering={FadeInRight.delay(index * 100).duration(1000).springify()}>
                      {
                        day.rank === 1? (
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-yellow-500 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        ): day.rank === 2? (
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-slate-500 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        ): day.rank === 3? (
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-orange-800 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        ):(
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-white text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        )
                      }
                    </Animated.View>
                  )
                })
              } 
            </ScrollView>
          </View>

{/* ========TOTAL POINTS====== */}
          <View style={tw`flex-col justify-center items-center bg-white/10 p-2 `}>
            <Text style={tw`text-white text-2xl `}>Total: {self?.total_points} pts</Text>
          </View>




        </View>

{/* chose pic or lottie modal */}
        <PicOrLottieModal pOLModalOpen={pOLModalOpen} setPOLModalOpen={setPOLModalOpen} />



{/* ===============AVATAR STORE MODAL============= */}
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

    {/* ======================LOADING==================== */}
      


      </SafeAreaView>
      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}