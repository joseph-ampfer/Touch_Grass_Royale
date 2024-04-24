import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import PopUp from '../components/PopUp'
import { useMutation } from '@tanstack/react-query'
import { validateCode } from '../apiFetches/fetches'
import { storage } from '../Storage'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'

export default function EnterCodeScr({ route, navigation }) {
  const email = route.params?.email

  const validateCodeFn = useMutation({
    mutationFn: (data) => validateCode(data),
    onSuccess: (results) => {
      storage.set('short_token', results.short_token);
      storage.set('my_id', results.user_id)
      navigation.push('ResetPassScr')
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })

  const [code, setCode] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(true);

  const codeInputRef = useRef(null);
  
  const isPending = false;

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      <View style={tw`flex-col h-full justify-center  mx-5 -mt-5`}>

        <Text style={tw`text-white text-lg  text-center mb-4`}>ENTER CONFIRMATION CODE</Text>
        <Text style={tw`text-neutral-500 text-center mb-5`}>Enter the 8 character confirmation code we sent to {email}.</Text>
        
        {/* Code Input */}
        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <TextInput 
            ref={codeInputRef}
            placeholder='Login code' 
            placeholderTextColor='rgba(255,255,255,0.5)' 
            style={tw` text-white`} 
            onChangeText={(text) => setCode(text)}
          />
        </View>

        {/* Button */}
        {
          validateCodeFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          code ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                validateCodeFn.mutate({ email: email, code: code })
                codeInputRef.current.blur();
              }} 
            >
              <Text style={tw`text-white font-semibold  `}>Next</Text>
            </TouchableOpacity>
          ):(
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`} >
              <Text style={tw`text-white/50 font-semibold  `}>Next</Text>
            </View>
          )
        }

      </View>
      
      <PopUp
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title='Login code sent' 
        message={`We sent a login code to ${email} to get you back into your account.`}
        OKmsg="OK" 
        OKfn={() => setPopUpOpen(false)}
      />
    </KeyboardAvoidingView>
  )
}