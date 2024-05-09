import { View, Text, TouchableOpacity, Image, ActivityIndicator, Pressable, Linking } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { getPushPermissions, registerForPushAsync } from '../usePushNotifications';
import PopUp from '../components/PopUp';



export default function NotificationsScreen({ navigation }) {


  const registerPushFn = useMutation({
    mutationFn: () => registerForPushAsync(),
    onSuccess: () => {
      setPopTitle("Registered For Notifications!")
      setPopMsg("You can now recieve messages from other users, and get notified when you win." )
      setPopOkMsg("OK" )
      setPopUpOpen(true);
    },
    onError: (error) => {
      console.error(error.detail);
      setPopTitle("Problem during registration")
      setPopMsg("Try again in a few minutes." )
      setPopOkMsg("OK" )
      setPopUpOpen(true);
    }
  })

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popNoMsg, setPopNoMsg] = useState('');
  const [popOkFn, setPopOkFn] = useState(null);
  const [popNoFn, setPopNoFn] = useState(null);


  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>

{/* ========TOP BAR======== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>Notifications</Text>
        </View>




        {/* USER INFO COLUMN */}
        <View style={tw`flex-col mx-5 mt-10`}>
          <Text style={tw`text-white text-lg text-center mb-5`}>If you did not accept notifications at the beginning, you can first update your settings, then register for notifications.</Text>
          <TouchableOpacity style={tw`mb-4 flex-row`} onPress={() => Linking.openSettings()} >
            <Text style={tw`text-white text-lg`}>1. </Text>
            <Text style={tw`text-blue-600 text-lg`}>Update settings</Text>
          </TouchableOpacity>
          {
            registerPushFn.isPending ? (
              <ActivityIndicator />
            ):(
              <TouchableOpacity style={tw`mb-4 flex-row`} onPress={() => registerPushFn.mutate()} >
                <Text style={tw`text-white text-lg`}>2. </Text>
                <Text style={tw`text-blue-600 text-lg`}>Register for notifications</Text>
              </TouchableOpacity>
            )
          }

        </View>


      </SafeAreaView>

      <PopUp
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title={popTitle} 
        message={popMsg}
        OKmsg={popOkMsg}
        OKfn={() => setPopUpOpen(false)}
      />

    </View>
  )
}