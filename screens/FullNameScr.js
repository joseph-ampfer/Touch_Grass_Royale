import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation } from '@tanstack/react-query';
import { register, updateProfile } from '../apiFetches/fetches';
import PopUp from '../components/PopUp';


export default function FullNameScr({ navigation }) {

  const registerFn = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: () => {
      setPopTitle('Success!');
      setPopMsg('Your account was created.');
      setPopOkMsg('OK');
      setPopUpOpen(true);
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

  const updateFn = useMutation({
    mutationFn: (changes) => updateProfile(changes),
    onSuccess: () => {
      navigation.navigate('Pic')
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })


  const [popTitle, setPopTitle] = useState('Welcome!');
  const [popMsg, setPopMsg] = useState('Your Touch Grass Royale account has been created. Personalize it here.');
  const [popOkMsg, setPopOkMsg] = useState('OK');
  const [popNoMsg, setPopNoMsg] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(true);

  const [name, setName] = useState('');
  const nameInputRef = useRef(null);


  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [pending, setPending] = useState(false);

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      
      <View style={tw`h-full justify-center flex-col mx-5`}>
        <Text style={tw`text-white text-3xl font-bold text-center mb-3`}>Add your name</Text>
        <Text style={tw`text-neutral-500 text-center mb-6 px-10`}>Help people discover your account by using the name you're known by: like your full name or nickname.</Text>
       {/* Text Inputs */}
       <View style={tw`p-3 bg-white/20 rounded-md mb-5 `}>
          <View>
            <TextInput 
              ref={nameInputRef}
              placeholder='Name'              
              placeholderTextColor='rgba(255,255,255,0.5)' 
              style={tw`  text-white`} 
              onChangeText={(text) => {
                setName(text);
              }}
            />

          </View>
        </View>
        
        {/* Button */}
        {
          updateFn.isPending ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          name ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                updateFn.mutate({ full_name: name })
                nameInputRef.current.blur()
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
        <TouchableOpacity 
        style={tw`flex-row justify-end`}
        onPress={() => navigation.navigate('Pic')}
        >
          <Text style={tw`text-white/90 mr-2`}>Skip</Text>
        </TouchableOpacity>


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