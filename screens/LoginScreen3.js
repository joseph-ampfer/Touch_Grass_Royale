import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { loginFetch, sendPushTokenToServer } from '../apiFetches/fetches';
import { storage } from '../Storage';
import PopUp from '../components/PopUp';
import * as LocalAuthentication from 'expo-local-authentication';
import { usePushNotifications } from '../usePushNotifications'; 

export default function LoginScreen3({ route, navigation }) {
  const expired = route?.params?.expired
  const { registerForPushNotificationsAsync } = usePushNotifications();

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popNoMsg, setPopNoMsg] = useState('');
  const [popOkFn, setPopOkFn] = useState(null);
  const [popNoFn, setPopNoFn] = useState(null);

  useEffect(() => {
    if (expired) {
      setPopTitle('Login')
      setPopMsg('Session expired, login again for account security.')
      setPopOkMsg('OK')
      setPopOkFn(() => () => setPopUpOpen(false))
      setPopUpOpen(true);
    }
  }, [expired, navigation]);


  const loginFn = useMutation({
    mutationFn: (creds) => loginFetch(creds),
    onSuccess: async (result) => {
      storage.set('access_token', result.access_token);
      storage.set('my_id', result.user_id);
      setEmail('');
      setPassword('');

      try {
        const push_token = await registerForPushNotificationsAsync();
        if (push_token) {
          await sendPushTokenToServer(push_token.data);
        }
      } catch (error) {
        console.error("Error in updating the push token: ", error.detail || error.message);
      }

      navigation.push('Home');

    },
    onError: (error) => {
      console.error(error.detail);
      setPopTitle("Invalid Email or Password")
      setPopMsg("Check your email and password and try again. If you don't have a Touch Grass Royale account you can sign up." )
      setPopOkMsg("Try Again" )
      setPopNoMsg("Sign Up")
      setPopOkFn(() => setPopUpOpen(false))
      setPopNoFn(() => () => {
        navigation.navigate('SignUp3');
        setPopUpOpen(false);
      })
      setPopUpOpen(true);

    }
  })


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);



  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height); // set keyboard height
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0); // reset keyboard height
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [pending, setPending] = useState(false);


  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      
      <View style={tw`h-full justify-center flex-col mx-5`}>

        {/* Logo */}
        <View style={tw`flex-row justify-center mb-5`}>
          <Image source={require('../assets/images/logo-plain-script.png')} style={[tw`w-2/3 `, {aspectRatio: 5}]} />
        </View>
       
       {/* Text Inputs */}
        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <TextInput 
            ref={emailInputRef}
            placeholder='Email' 
            inputMode='email'
            autoComplete='email'
            placeholderTextColor='rgba(255,255,255,0.5)' 
            style={tw`  text-white`} 
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={tw`p-3 bg-white/20 rounded-md mb-5`}>
          <View>
            <TextInput 
              ref={passwordInputRef}
              placeholder='Password' 
              secureTextEntry={!passwordVisible}
              autoComplete='current-password'
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

        {/* Button */}
        {
          loginFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          email && password ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                loginFn.mutate({ email: email.toLowerCase().trimEnd(), password: password })
                //setPending(!pending);
                passwordInputRef.current.blur();
                emailInputRef.current.blur();
              }} 
            >
              <Text style={tw`text-white font-semibold  `}>Login</Text>
            </TouchableOpacity>
          ):(
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`} >
              <Text style={tw`text-white/50 font-semibold  `}>Login</Text>
            </View>
          )
        }

        {/* Forgot login text */}
        <View style={tw`flex-row justify-center mb-5`}>
          <Text style={tw`text-neutral-500`}>Forgot your login details? </Text>
          <TouchableOpacity style={tw` `}  onPress={() => navigation.navigate('LoginHelp')} >
            <Text style={tw`text-white`}>Get help logging in.</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Bottom bar, Don't have account */}
      <View style={[tw`absolute bottom-0 w-full`, {marginBottom: keyboardHeight}]}  >
        <View style={tw`flex-row justify-center p-3 border-t-2 border-gray-600/50`}>
          <Text style={tw`text-neutral-500`}>Don't have an account? </Text>
          <TouchableOpacity style={tw` `} onPress={() => navigation.navigate('SignUp3')} >
            <Text style={tw`text-white`}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PopUp 
        popUpOpen={popUpOpen} 
        setPopUpOpen={setPopUpOpen} 
        title={popTitle} 
        message={popMsg}
        OKmsg={popOkMsg}
        NOmsg={popNoMsg}
        OKfn={popOkFn}
        NOfn={popNoFn}
      />

    </KeyboardAvoidingView>
  )
}