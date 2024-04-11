import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';
import ProfileModal from '../components/ProfileModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeLottie, getOwnedLottie } from '../api/fetches';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Modal from 'react-native-modal';



export default function AvatarsScreen({ navigation }) {

  const queryClient = useQueryClient();

  const { data: lotties, isLoading, error } = useQuery({
    queryKey: ['lotties'],
    queryFn: getOwnedLottie,
  })

  const changeLottieFn = useMutation({
    mutationFn: (name) => changeLottie(name),
    onSuccess: () => {
        navigation.goBack();
        queryClient.invalidateQueries({ queryKey: ['self'] })
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
    },
    onError: (error) => {
        console.error(JSON.stringify(error, null, 2))
    }
  })

  const [selected, setSelected] = useState(null);

  const insets = useSafeAreaInsets();
  
  const isLoading2 = 0;

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
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Unlocked Avatars</Text>
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

  if (error) {
    console.error(error)
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
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Avatars</Text>
        </View>

        {
          selected != null ? (
            <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
              <TouchableOpacity 
                style={tw`border-2 border-slate-50 rounded-full  px-5`} 
                onPress={() => changeLottieFn.mutate(selected)}
              >
                <Text style={tw`text-slate-50  text-center text-lg`}>Set avatar</Text>
              </TouchableOpacity>
            </View>
          ):(
            <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
              <Text style={tw`text-slate-50  text-center text-lg`}>Tap to preview</Text>
            </View>
          )
        }


{/* ========SCROLLVIEW LOTTIES LIST====== */}
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 45 }}>
          <Pressable 
              style={tw` mb-2 mx-5 flex-row justify-center items-center  bg-white/10`}
              onPress={() => setSelected('')}
            >
              <View style={tw` `}>
                <View style={tw`h-50 w-50 rounded-full z-30 flex-row justify-center items-center`}>
                  <Text style={tw`text-white/40 text-3xl`}>None</Text>
                </View>
              </View>
              {
                selected == '' ? (
                  <View style={tw` absolute top-0 right-0`}>
                    <Ionicons style={tw`text-white`} name='checkmark-circle' size={28} />
                  </View>
                ):null
              }
          </Pressable>
          {
            lotties.map((lottie, index) => {
              return (
                // friend component
                <Pressable 
                  key={index} style={tw` mb-2 mx-5 flex-row justify-center items-center  bg-white/10`}
                  onPress={() => setSelected(lottie)}
                >

                  <View 
                    style={tw` `}
                  >
                    <View style={tw`h-50 w-50 rounded-full z-30 `}>
                      <LottieView
                        source={animations[lottie]}
                        style={tw`h-full w-full `}
                        autoPlay={ selected == lottie }
                        loop={ selected == lottie }
                        speed={1}
                      />
                    </View>
                  </View>
                  {
                    lottie == selected ? (
                      <View style={tw` absolute top-0 right-0`}>
                        <Ionicons style={tw`text-white`} name='checkmark-circle' size={28} />
                      </View>
                    ):null
                  }
                </Pressable>
              )
            })
          }
        </ScrollView>


      </SafeAreaView>

{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar />

    </View>
  )
}