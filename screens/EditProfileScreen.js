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
import { changeLottie, getOwnedLottie } from '../apiFetches/fetches';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { getSelf } from '../apiFetches/fetches';


export default function EditProfileScreen({ navigation }) {

  const { data: self, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  })


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
            <Text style={tw`text-white text-2xl font-bold ml-6`}>Edit profile</Text>
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

{/* ========TOP BAR======== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Edit profile</Text>
        </View>

        {/* PICTURE SECTION */}
        <View style={tw`flex-col items-center mt-10 mb-5`}>
          {/* IMAGES ROW */}
          <View style={tw`flex-row justify-center mb-3`}>
            <TouchableOpacity style={tw`mx-2`}>
              <Image 
                style={tw`h-22 w-22 rounded-full`} 
                source={{ uri: self?.pic }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`mx-2 flex-row justify-center items-center h-22 w-22 rounded-full bg-white/80`}
            >
              <Ionicons name='person' color='black' size={32} />
            </TouchableOpacity>
          </View>
          {/* TEXT */}
          <View>
            <Text style={tw`text-white`}>Edit picture or avatar</Text>
          </View>
        </View>

        {/* USER INFO COLUMN */}
        <View style={tw`flex-col mx-5`}>
          <Pressable 
            style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}
            onPress={() => navigation.push('Edit', {
              fieldType: 'Username',
              value: self?.username
            })}  
          >
            <Text style={tw`text-white/50`}>Username</Text>
            <Text style={tw`text-white text-lg`}>{self?.username}</Text>
          </Pressable>
          <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>
            <Text style={tw`text-white/50`}>Name</Text>
            <Text style={tw`text-white text-lg`}>{self?.full_name ? self.full_name : ''}</Text>
          </View>
          <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>
            <Text style={tw`text-white/50`}>Email</Text>
            <Text style={tw`text-white text-lg`}>{self?.email}</Text>
          </View>
          <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>
            <Text style={tw`text-white/50`}>Password</Text>
            <Text style={tw`text-white text-lg`}>************</Text>
          </View>
        </View>



      </SafeAreaView>


{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar />

    </View>
  )
}