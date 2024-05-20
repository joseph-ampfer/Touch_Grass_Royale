import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { checkEmail, checkUsername, register, resetPassword } from '../apiFetches/fetches';
import PopUp from '../components/PopUp';
import debounce from '../debounce/debounce';
import { storage } from '../Storage';


export default function SignUpScreen3({ navigation }) {

  const registerFn = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: async (result) => {
      storage.set('access_token', result.access_token);
      storage.set('my_id', result.user_id);

      try {
        const {token, isGranted} = await registerForPushNotificationsAsync();
        if (token) {
          await sendPushTokenToServer({push_token: token.data, push_enabled: isGranted});
        }
      } catch (error) {
        console.error("Error in updating the push token: ", error.detail || error.message);
      }

      navigation.navigate('FullName');
    },
    onError: (error) => {
      if (error.detail[0].loc[1] == 'email') {
        setPopTitle('Invalid email');
        setPopMsg('Please enter a valid email address.');
        setPopOkMsg('OK');
        setPopUpOpen(true);
      } else if (error.detail == 'Username taken') {
        setPopTitle('Username taken');
        setPopMsg('A user with that username already exists.');
        setPopOkMsg('OK');
        setPopUpOpen(true);
      } else {
        console.error(error.detail)
      }
    }
  })

  const handleCheckUsername = async input => {
    if (input == '') {
      setUsernameTaken(false);
      return
    }
    try {
      const response = await checkUsername(input);
      setUsernameTaken(false);
    } catch (error) {
      setUsernameTaken(true);
    }
  }
  const debounceCheckUsername = debounce(handleCheckUsername, 500)

  const handleCheckEmail = async input => {
    if (input == '') {
      setEmailTaken(false);
      return
    }
    try {
      const response = await checkEmail(input);
      setEmailTaken(false);
    } catch (error) {
      setEmailTaken(true);
    }
  }
  const debounceCheckEmail = debounce(handleCheckEmail, 500)
  

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popNoMsg, setPopNoMsg] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false)

  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordInputRef2 = useRef(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [popUpOpen, setPopUpOpen] = useState(false);


  const [pending, setPending] = useState(false);

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      
      <View style={tw`h-full justify-center flex-col mx-5`}>
        <Text style={tw`text-white text-3xl  text-center mb-3`}>Create account</Text>
        <Text style={tw`text-neutral-500 text-center mb-6 px-10`}>Get started with Touch Grass Royale by creating an account.</Text>
       {/* Text Inputs */}
       <View style={tw`p-3 bg-white/20 rounded-md ${usernameTaken ? 'border-red-700/50 border-2' : ''} `}>
          <View>
            <TextInput 
              ref={usernameInputRef}
              placeholder='Username'              
              placeholderTextColor='rgba(255,255,255,0.5)' 
              style={tw`  text-white`} 
              onChangeText={(text) => {
                debounceCheckUsername(text);
                setUsername(text);
              }}
            />
            {
              usernameTaken ? (
                <TouchableOpacity
                  style={tw` absolute right-0 bottom-0 z-10`}
                  onPress={() => {
                    usernameInputRef.current.clear();
                    setUsernameTaken(false);
                    setUsername('');
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={26}
                    style={tw`text-white/40`}
                  />
                </TouchableOpacity>
              ): username ? (
              <View style={tw` absolute right-0 bottom-0 z-10`} >
                <Ionicons
                  name="checkmark"
                  size={26}
                  style={tw`text-green-800`}
                />
              </View> 
              ):null
            }
          </View>
        </View>
        <Text style={tw`mb-5 ${usernameTaken ? 'text-red-700' : 'text-neutral-500' } `}>{usernameTaken ? 'That username is already taken':'You can always change it later'}</Text>

        <View style={tw`p-3 bg-white/20 rounded-md ${emailTaken ? 'border-red-700/50 border-2' : ''} `}>
          <View>
            <TextInput 
              ref={emailInputRef}
              placeholder='Email' 
              inputMode='email'
              autoComplete='email'
              placeholderTextColor='rgba(255,255,255,0.5)' 
              style={tw`  text-white`} 
              onChangeText={(text) => {
                debounceCheckEmail(text)
                setEmail(text)
              }}
            />
            {
              emailTaken ? (
                <TouchableOpacity
                  style={tw` absolute right-0 bottom-0 z-10`}
                  onPress={() => {
                    emailInputRef.current.clear();
                    setEmailTaken(false);
                    setEmail('');
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={26}
                    style={tw`text-white/40`}
                  />
                </TouchableOpacity>
              ): email ? (
              <View style={tw` absolute right-0 bottom-0 z-10`} >
                <Ionicons
                  name="checkmark"
                  size={26}
                  style={tw`text-green-800`}
                />
              </View> 
              ):null
            }
          </View>
        </View>
        <Text style={tw`mb-5 ${emailTaken ? 'text-red-700' : 'text-neutral-500'}`}>{emailTaken ? 'A user with that email already exists':'Used for account recovery'}</Text>

        <View style={tw`p-3 bg-white/20 rounded-md `}>
          <View>
            <TextInput 
              ref={passwordInputRef}
              placeholder='Password' 
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
        <Text style={tw`text-neutral-500 mb-5`}>Must be at least 8 characters long</Text>

        <View style={tw`p-3 bg-white/20 rounded-md mb-8 ${password != confirmPasword ? 'border-2 border-red-700/50/50' : ''}`}>
          <View>
            <TextInput 
              ref={passwordInputRef2}
              placeholder='Confirm password' 
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
          registerFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          password === confirmPasword && password.length >= 8 && username && !usernameTaken && email && !emailTaken ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                registerFn.mutate({ username: username, email: email, password: password, confirm_password: confirmPasword })
                passwordInputRef2.current.blur();
                passwordInputRef.current.blur();
                emailInputRef.current.blur();
                usernameInputRef.current.blur();
              }} 
            >
              <Text style={tw`text-white font-semibold  `}>Create</Text>
            </TouchableOpacity>
          ):(
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`} >
              <Text style={tw`text-white/50 font-semibold  `}>Create</Text>
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