import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSelf, updateProfile } from '../apiFetches/fetches';
import PopUp from '../components/PopUp';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from "../firebaseConfig";
import { my_id } from '../secrets';
import { storage } from '../Storage';


export default function PicScreen({ navigation }) {

  const { data: self, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  })

  print(self)

  const updateFn = useMutation({
    mutationFn: (changes) => updateProfile(changes),
    onSuccess: () => {
      navigation.navigate('RegFriends');
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })


  const [popTitle, setPopTitle] = useState('');
  const [popMsg, setPopMsg] = useState('');
  const [popOkMsg, setPopOkMsg] = useState('');
  const [popNoMsg, setPopNoMsg] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(false);



  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  //pickimage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    //upload media files
    const uploadMedia = async () => {
      setUploading(true);
      try {
        const { uri } = await FileSystem.getInfoAsync(image);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
  
        // const filename = image.substring(image.lastIndexOf("/") + 1);
        const filename = storage.getNumber('my_id').toString()
        const ref = firebase.storage().ref().child(filename);
  
        const snapshot = await ref.put(blob);
  
        // Get download URL
        const downloadURL = await snapshot.ref.getDownloadURL();
  
        // Store download URL
        updateFn.mutate({ pic: downloadURL });
  
        setUploading(false);
        //setImage(null);
  
      } catch (error) {
        console.error(error);
        //setImage(null);
        setUploading(false);
      }
    };



  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [pending, setPending] = useState(false);

  if (error) {
    console.error(error)
  }

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-black`} behavior='padding' >
      <StatusBar style='light' />
      
      <View style={tw`h-full justify-center flex-col mx-5`}>
        <Text style={tw`text-white text-3xl font-bold text-center mb-2`}>Choose your avatar</Text>
        <Text style={tw`text-neutral-500 text-center mb-6 px-10`}>Set up your profile picture</Text>
       
       {
        isLoading ? (
          <View style={tw`flex-row justify-center items-center h-35 w-35 mb-5`}>
            <ActivityIndicator />
          </View>
        ): image ? (
          <TouchableOpacity 
            style={tw`flex-row justify-center items-center mb-5`}
            onPress={() => pickImage()}
          >
            <Image style={tw`h-35 w-35 rounded-full`} source={{ uri: image }} />
          </TouchableOpacity>
        ):(
          <TouchableOpacity 
            style={tw`flex-row justify-center items-center mb-5`}
            onPress={() => pickImage()}
          >
            <Image style={tw`h-35 w-35 rounded-full`} source={{ uri: self?.pic }} />
          </TouchableOpacity>
        )
       }

        
        {/* Button */}
        {
          uploading ? (
            <View style={tw`p-4 rounded-lg bg-sky-600/50  mb-5 flex-row justify-center items-center`}>
              <ActivityIndicator color='white' />
            </View>
          ):
          image ? (
            <TouchableOpacity
              style={tw`p-4 rounded-lg bg-sky-600  mb-5 flex-row justify-center items-center`}
              onPress={() => {
                uploadMedia()
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
        <TouchableOpacity style={tw`flex-row justify-end`}>
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