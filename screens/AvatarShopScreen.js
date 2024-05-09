import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import LottieView from 'lottie-react-native';
import ProfileModal from '../components/ProfileModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { buyLottie, getAllAnimations, getOwnedLottie } from '../apiFetches/fetches';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import PopUp from '../components/PopUp';



export default function AvatarShopScreen({ navigation }) {

  const queryClient = useQueryClient();

  const {data: animations, isLoading, error } = useQuery({
    queryKey: ['all animations'],
    queryFn: getAllAnimations,
  })

  const {data: lotties, isLoading: ownedLoading, error: ownedError} = useQuery({
    queryKey: ['lotties'],
    queryFn: getOwnedLottie,
  })
  
  const buyLottieFn = useMutation({
    mutationFn: ({ name, price }) => buyLottie(name, price),
    onSuccess: () => {
        setModalOpen(false);
        setShowFireworks(true);
        queryClient.invalidateQueries({ queryKey: ['lotties'] })
        queryClient.invalidateQueries({ queryKey: ['self'] })
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
    },
    onError: (error) => {
      if (error.detail == 'Not enough gems') {
        setPopTitle('Not enough gems');
        setPopMsg('Finish in 1st, 2nd or 3rd place to earn gems.');
        setPopUpOpen(true);
        setModalOpen(false);
      } else {
        console.error(JSON.stringify(error.detail, null, 2));
        console.log(JSON.stringify(error.detail, null, 2));
      }
    }
  })

  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState("");
  const [popOkMsg, setPopOkMsg] = useState('OK');
  const [popNoMsg, setPopNoMsg] = useState('');
  const [popNoFn, setPopNoFn] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);


  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState({});
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  
  playFireworks = () => {
    this.fireworks.play();
  }

  const insets = useSafeAreaInsets();
  
  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-black`}>
        <StatusBar style='light' />
        <SafeAreaView style={tw`flex-1`}>
{/* =====TOP BAR===== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Avatar Shop</Text>
        </View>

        <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
          
        </View>

      <View style={tw`flex-1 flex-col justify-center items-center mb-15 bg-black/40`}>
        <ActivityIndicator size={50} color="#FFFFFF" />
      </View>

      </SafeAreaView>

{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar />

    </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>
{/* =====TOP BAR===== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Avatar Shop</Text>
        </View>

        <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
          <Text style={tw`text-slate-50  text-center text-lg`}>Tap to preview</Text>
        </View>

{/* ========SCROLLVIEW LOTTIES LIST====== */}
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom  }}>
          {
            animations.map((animation, index) => {
              return (
                // friend component
                <Pressable 
                  key={index} style={tw` mb-2 mx-5 flex-row justify-center items-center  bg-white/10`}
                  onPress={() => setSelectedPreview(animation.name)}
                >

                  <View style={tw` `}>
                    <View style={tw`h-50 w-50 rounded-full `}>
                      <LottieView
                        source={{ uri: animation.download_url }}
                        style={tw`h-full w-full `}
                        autoPlay={ selectedPreview == animation.name }
                        loop={ selectedPreview == animation.name }
                        speed={1}
                      />
                    </View>
                  </View>
                  {
                    lotties?.includes(animation.name) ? (
                      // <TouchableOpacity 
                      //   style={[tw` rounded-full px-2 absolute bottom-1 right-14 elevation-10 `, ]} 
                      // >
                      //   <View style={tw`flex-row justify-center items-center `}>
                          
                      //     <FontAwesome5 name="lock-open" size={17} color="white" />
                      //   </View>
                      // </TouchableOpacity>
                      null
                    ):(
                      <TouchableOpacity 
                        style={[tw`bg-blue-600 rounded-full px-2 absolute bottom-1 right-10 elevation-10 `, ]}
                        onPress={() => {
                          setSelectedAnimation(animation);
                          setModalOpen(true);
                        }} 
                      >
                        <View style={tw`flex-row justify-center items-center `}>
                          <Text style={tw`text-white text-center mx-1 text-lg`}>{animation.price}</Text>
                          <FontAwesome5 name="gem" size={17} color="white" />
                        </View>
                      </TouchableOpacity>
                    )
                  }

                </Pressable>
              )
            })
          }
        </ScrollView>

        <PopUp
          popUpOpen={popUpOpen} 
          setPopUpOpen={setPopUpOpen} 
          title={popTitle}
          message={popMsg}
          OKmsg={popOkMsg}
          NOmsg={popNoMsg}
          OKfn={() => setPopUpOpen(false)}
          NOfn={popNoFn}
        />

{/* =========PURCHASE MODAL========= */}
        <Modal 
          animationIn='slideInUp' 
          animationInTiming={100}
          animationOut='zoomOut'
          animationOutTiming={200}
          backdropTransitionInTiming={200}
          backdropTransitionOutTiming={200}
          isVisible={modalOpen}
          onBackButtonPress={() => setModalOpen(false)}
          onBackdropPress={() => setModalOpen(false)}         
          useNativeDriverForBackdrop={true}
          style={tw`justify-center m-auto `}
        >
        <View style={tw`bg-neutral-800 rounded-xl   `}>
          <View style={tw`flex-col items-center justify-center px-5 pt-5`}>
            {/* LOTTIE */}
            <View style={[tw`h-66 w-66  rounded-lg `, ]}>
              <LottieView 
                  source={{ uri: selectedAnimation.download_url }} 
                  style={{width:'100%', height:'100%'}}
                  autoPlay 
                  loop 
                  speed={1}
              />
            </View>
            {/* QUESTION */}
            <View style={tw`my-3`}>
              <Text style={tw`text-lg text-slate-50`}>Unlock for {selectedAnimation.price} gems?</Text>
            </View>

          </View>

            {/* UNLOCK OR CANCEL BUTTONS */}
            <View style={tw`flex-col   `}>
              <TouchableOpacity 
                style={tw` flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`}
                onPress={() => {
                    buyLottieFn.mutate({name: selectedAnimation.name, price: selectedAnimation.price});
                }} 
              >
                <Text style={tw`text-blue-500 text-center text-base font-bold my-auto`}>Unlock</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`}
                onPress={() => setModalOpen(false)} 
              >
                  <Text style={tw`text-slate-50 text-center text-base  my-auto `}>Cancel</Text>
              </TouchableOpacity>
            </View>


        </View>
        </Modal>

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

      </SafeAreaView>

    </View>
  )
}