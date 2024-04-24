import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator, Pressable, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { loginFetch, sendRecoverCode } from '../apiFetches/fetches';
import { storage } from '../Storage';
import PopUp from '../components/PopUp';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginHelp({ navigation }) {

  const sendRecoverCodeFn = useMutation({
    mutationFn: (input) => sendRecoverCode(input),
    onSuccess: (result) => {
      navigation.push('EnterCode', { email: result.email } )
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })

  const [email, setEmail] = useState('');
  const emailInputRef = useRef(null);

  const [popUpOpen, setPopUpOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const dimensions = Dimensions.get('screen');

  const pending = false;

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />

      <View style={[tw``, {marginTop: insets.top}]}>
        <Text style={tw`text-white text-2xl font-bold ml-5`}>Login help</Text>
      </View>

      <View style={[tw`h-2/3 justify-center flex-col mx-5`, ]}>

        {/* Info text */}
        <View style={tw`flex-col  mb-10 mx-10`}>
          <Text style={tw`text-white text-lg font-bold text-center mb-2`}>Find your account</Text>
          <Text style={tw`text-neutral-500 text-center`}>Enter your username or email linked to your account.</Text>
        </View>
       
       {/* Text Inputs */}
        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <TextInput 
            ref={emailInputRef}
            placeholder='Username or email' 
            autoComplete='email'
            placeholderTextColor='rgba(255,255,255,0.5)' 
            style={tw`  text-white`} 
            onChangeText={(text) => setEmail(text)}
          />
        </View>


        {/* Button */}
        {
          sendRecoverCodeFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          email ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                sendRecoverCodeFn.mutate(email)
                emailInputRef.current.blur();
              }} 
            >
              <Text style={tw`text-white font-semibold `}>Next</Text>
            </TouchableOpacity>
          ):(
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`} >
              <Text style={tw`text-white/50 font-semibold  `}>Next</Text>
            </View>
          )
        }


      </View>

      {/* <PopUp 
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title='Login code sent' 
        message={`We sent a login code to ${email} to get you back into your account.`}
        OKmsg="OK" 
        OKfn={() => setPopUpOpen(false)}
      /> */}

    </KeyboardAvoidingView>
  )
}