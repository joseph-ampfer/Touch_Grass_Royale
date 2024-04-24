import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../apiFetches/fetches';
import PopUp from '../components/PopUp';


export default function ResetPassScr({ navigation }) {

  const resetPasswordFn = useMutation({
    mutationFn: (passwords) => resetPassword(passwords),
    onSuccess: () => {
      setPopTitle('Password Has Been Reset');
      setPopMsg('Log in using your email and new password.');
      setPopOkMsg('OK');
      setPopUpOpen(true);
      navigation.navigate('Login3');
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popNoMsg, setPopNoMsg] = useState('');


  const [password, setPassword] = useState('');
  const [confirmPasword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false)


  const passwordInputRef = useRef(null);
  const passwordInputRef2 = useRef(null)

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [popUpOpen, setPopUpOpen] = useState(false);


  const [pending, setPending] = useState(false);

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      
      <View style={tw`h-full justify-center flex-col mx-5`}>
        <Text style={tw`text-white text-lg font-bold text-center mb-4`}>Reset Password</Text>
        <Text style={tw`text-neutral-500 text-center mb-6 px-10`}>Choose a new password for your account. Must be at least 8 characters long.</Text>
       {/* Text Inputs */}
        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <View>
            <TextInput 
              ref={passwordInputRef}
              placeholder='New password' 
              secureTextEntry={!passwordVisible}
              autoComplete='new-password'
              placeholderTextColor='rgba(255,255,255,0.5)' 
              style={tw`  text-white`} 
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw` absolute right-0 bottom-0 z-10`}
              onPressIn={() => setPasswordVisible(true)}
              onPressOut={() => setPasswordVisible(false)}
            >
              <Ionicons
                name="eye-off-outline"
                size={26}
                style={tw`text-white/40`}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <View>
            <TextInput 
              ref={passwordInputRef2}
              placeholder='Confirm new password' 
              secureTextEntry={!passwordVisible2}
              autoComplete='new-password'
              placeholderTextColor='rgba(255,255,255,0.5)' 
              style={tw`  text-white`} 
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity
              style={tw` absolute right-0 bottom-0 z-10`}
              onPressIn={() => setPasswordVisible2(true)}
              onPressOut={() => setPasswordVisible2(false)}
            >
              <Ionicons
                name="eye-off-outline"
                size={26}
                style={tw`text-white/40`}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Button */}
        {
          resetPasswordFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          password === confirmPasword && password.length >= 8 ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                resetPasswordFn.mutate({ new_password: password, confirm_password: confirmPasword })
                passwordInputRef2.current.blur();
                passwordInputRef.current.blur();
              }} 
            >
              <Text style={tw`text-white font-semibold  `}>Reset</Text>
            </TouchableOpacity>
          ):(
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`} >
              <Text style={tw`text-white/50 font-semibold  `}>Reset</Text>
            </View>
          )
        }

      </View>


      <PopUp 
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title={popTitle}
        message={popMsg}
        OKmsg={popOkMsg}
        NOmsg={popNoMsg}
        OKfn={() => setPopUpOpen(false)}
      />

    </KeyboardAvoidingView>
  )
}