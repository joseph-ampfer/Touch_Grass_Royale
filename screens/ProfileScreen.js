import { View, Text, Image, Pressable, BackHandler, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavBar from '../components/BottomNavBar';
import { ScrollView, GestureHandlerRootView, TouchableOpacity, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { Modalize, useModalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Animated, { Easing, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeOut, FadeOutDown, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LottieAvatarShop from '../components/LottieAvatarShopUnused';
import { useQuery } from '@tanstack/react-query';
import { getAllLevels, getSelf, getTenDayRank, googleCloudFetch } from '../apiFetches/fetches';
import toOrdinal from '../functions/toOrdinal';
import PicOrLottieModal from '../components/PicOrLottieModal';
import { getUserLevel } from '../levelingUp/levelConstants';
import { storage } from '../Storage';
import ProgressBar from '../components/ProgressBar';
import PopUp from '../components/PopUp';




// const recentPlacements = [
//   {
//     date: '4/1/2024',
//     rank: 5
//   },
//   {
//     date: '3/31/2024',
//     rank: 2
//   },
//   {
//     date: '3/30/2024',
//     rank: 13
//   },
//   {
//     date: '3/29/2024',
//     rank: 1
//   },
//   {
//     date: '3/28/2024',
//     rank: 3
//   },
//   {
//     date: '3/27/2024',
//     rank: 6
//   },
//   {
//     date: '3/26/2024',
//     rank: 21
//   },
//   {
//     date: '3/25/2024',
//     rank: 18
//   },
//   {
//     date: '3/24/2024',
//     rank: 3
//   },
//   {
//     date: '3/23/2024',
//     rank: 15
//   },
// ]

export default function ProfileScreen2({ navigation }) {

  const { data: self, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  })

  const { data: recentPlacements, isLoading: tenLoading, error: tenError } = useQuery({
    queryKey: ['10-day'],
    queryFn: getTenDayRank,
  })

  const { data: levelsData, isLoading: levelsLoading, error: levelsError } = useQuery({
    queryKey: ['all levels'],
    queryFn: getAllLevels,
  })



  const [pOLModalOpen, setPOLModalOpen] = useState(false);

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popOkFn, setPopOkFn] = useState(null);



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
  
  

  
  {/* =============TROPHIES============== */}         
          <View style={tw`h-12/100 mx-5 bg-white/10 p-1 pt-2 rounded-2xl mb-3`}>

          </View>
  
  
  {/* =============CURRENT RANK============= */} 
            <View style={tw`h-29/100 mx-5 bg-white/10 p-2 rounded-2xl `}>               
            </View>
  
      {/* body column */}
      <View style={tw`flex-col justify-between flex-1 mb-10 `}>

  {/* ==== =========PLACEMENTS LAST FEW DAYS============== */}
            <View style={tw` bg-slate-300`}>
            </View>
  
  {/* ========TOTAL POINTS====== */}
            <View style={tw` bg-white/10 p-2 h-30/100`}>   
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
            style={tw`flex-col items-center justify-center w-26 `}
            onPress={() => navigation.push('Friends', { userID: self.id, isCurrentUser: true, username: self.username } )}
          >
            <Text style={tw`text-white font-bold text-2xl`}>{self?.friends_count}</Text>
            <Text style={tw`text-slate-100 text-base font-semibold`}>Friends</Text>
          </TouchableOpacity>
          {/* PIC OR LOTTIE */}
          {
            self?.lottie? (
              <View style={tw`relative`}>
                <View style={tw`h-36 w-36 rounded-full`}>
                  <LottieView 
                      source={{ uri: self.lottie }} 
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
                <View style={tw`flex-row justify-center items-center h-36 w-36 rounded-full `}>
                  <Image 
                    source={{ uri: self?.pic }} 
                    style={tw`h-34 w-34 rounded-full `}
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
            style={tw`flex-col items-center justify-center w-26 `}
            onPress={() => {
              //alert('Finish in 1st, 2nd or 3rd place to earn gems.');
              setPopTitle('Gems');
              setPopMsg('Finish in 1st, 2nd or 3rd place to earn gems. More friends = more competition = bigger reward.');
              setPopOkMsg('OK')
              setPopOkFn(() => () => setPopUpOpen(false))
              setPopUpOpen(true);
            }}
          >
            <Text style={tw`text-white font-bold text-2xl`}>{self?.gems.toLocaleString()}</Text>
            <Text style={tw`text-slate-100 text-base font-semibold`}>Gems</Text>
          </TouchableOpacity>
        </View>
        {/* NAME OR FULL NAME */}
        {
          self.full_name? (
            <View style={tw`flex-col justify-center items-center mb-5  h-19`}>
              <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{self?.username}</Text>
              <Text style={tw`text-white/80 text-base text-center mt-1`}>{self?.full_name}</Text>
            </View>
          ):(
            <View style={tw`flex-col justify-center items-center mb-5 `}>
              <Text style={tw`text-white text-3xl font-bold text-center mt-3`}>{self?.username}</Text>
            </View>
          )
        }


        {/* BUTTONS: EDIT AND USE GEMS */}
        <View style={tw`flex-row justify-between mx-5 mb-3`}>
          <TouchableOpacity 
            style={tw`h-10 w-45 border-2 border-white/80 rounded-lg flex-row items-center justify-center`}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={tw`text-white text-center`}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`h-10 w-45 border-2 border-white/80 rounded-lg flex-row items-center justify-center`}
            onPress={() => {
              navigation.push('AvatarShop');
              //setPortalOpen(true)
            }}
          >
            <Text style={tw`text-white text-center`}>Use gems</Text>
          </TouchableOpacity>
        </View>




{/* =============TROPHIES============== */}         
        <View style={tw`flex-row justify-evenly mx-5 bg-white/10 p-1 pt-2 rounded-2xl h-12/100 mb-3`}>
          <View style={tw`flex-col items-center justify-center`}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/firstBlank.png')} />
            <Text style={tw`text-white text-lg font-bold`}>{self?.first}</Text>
          </View>
          <View style={tw`flex-col items-center justify-center`}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/secondBlank.png')} />
            <Text style={tw`text-white text-lg font-bold`}>{self?.second}</Text>
          </View>
          <View style={tw`flex-col items-center justify-center`}>
            <Image style={tw`h-15 w-15 `} source={require('../assets/images/thirdBlank.png')} />
            <Text style={tw`text-white text-lg font-bold`}>{self?.third}</Text>
          </View>
        </View>

  {/* body column */}
        <View style={tw`flex-col justify-between flex-1 mb-10 `}>

{/* =============CURRENT RANK============= */} 
        <View style={tw`mx-5 h-61.2/100`}>
         {levelsData? (
            <ProgressBar 
              totalPoints={self?.total_points} 
              userLevel={self?.level} 
              levelsData={levelsData} 
            />
         ):(
          <View style={tw`h-full bg-white/10 p-2 rounded-2xl`} />
         )} 
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
                            <Text style={tw`text-amber-500 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        ): day.rank === 2? (
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-slate-400 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
                            <Text style={tw`text-white`}>{day.date}</Text>
                          </View>
                        ): day.rank === 3? (
                          <View style={tw`flex-col justify-center items-center w-30  rounded-3xl py-3 mr-3 `}>
                            <Text style={tw`text-orange-700 text-2xl font-bold mb-1`}>{toOrdinal(day.rank)}</Text>
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
          <View style={tw`flex-col justify-center items-center bg-white/10   h-12/100`}>
            <Text style={tw`text-white text-2xl `}>Total: {self?.total_points?.toLocaleString()} pts</Text>
          </View>




        </View>

        {/* chose pic or lottie modal */}
        <PicOrLottieModal pOLModalOpen={pOLModalOpen} setPOLModalOpen={setPOLModalOpen} />

        


    {/* ======================LOADING==================== */}
      


      </SafeAreaView>

      <PopUp
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title={popTitle} 
        message={popMsg}
        OKmsg={popOkMsg}
        OKfn={popOkFn}
      />

      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}