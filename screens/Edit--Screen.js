import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Pressable, TextInput } from 'react-native';
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
import { changeLottie, getOwnedLottie, updateProfile } from '../apiFetches/fetches';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { getSelf } from '../apiFetches/fetches';

export default function Edit_Screen({ navigation, route }) {
  const { fieldType, value } = route.params;
  const [userInput, setUserInput] = useState(value);

  const queryClient = useQueryClient();
  const updateFn = useMutation({
    mutationFn: (changes) => updateProfile(changes),
    onSuccess: () => {
      navigation.goBack();
      queryClient.invalidateQueries({ queryKey: ['self'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })


  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>

{/* ========TOP BAR======== */}
        <View style={tw`flex-row items-center ml-3 mt-4 `}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="close-outline" size={34} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>{fieldType}</Text>
          <TouchableOpacity style={tw`absolute right-5`}>
            <Ionicons name="checkmark" size={34} style={tw`text-blue-600 `} />
          </TouchableOpacity>
        </View>

        {/* CONTENT AND TEXT INPUT */}
        <View style={tw`flex-col mx-5 mt-10`}>
          <View style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}>

            <Text style={tw`text-white/50`}>{fieldType}</Text>
            <TextInput 
              style={tw`text-white text-lg`}
              onChangeText={(text) => setUserInput(text)}
            >
              {value}
            </TextInput>

          </View>
          {/* Help text */}
          <View style={tw``}>
            <Text style={tw`text-white/50 `}>Help people discover your account by using the name you're known by, like your full name or nickname.</Text>
          </View>

        </View>



      </SafeAreaView>




    </View>
  )
}