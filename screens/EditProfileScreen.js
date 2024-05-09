import { View, Text, TouchableOpacity, Image, ActivityIndicator, Pressable, Linking } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import LottieView from 'lottie-react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../apiFetches/fetches';
import Modal from 'react-native-modal';
import { getSelf } from '../apiFetches/fetches';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from "../firebaseConfig";
import { my_id } from '../secrets';
import { registerForPushAsync } from '../usePushNotifications';


export default function EditProfileScreen({ navigation }) {

  const { data: self, isLoading, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  })

  const queryClient = useQueryClient();

  const updateFn = useMutation({
    mutationFn: (changes) => updateProfile(changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['self'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (error) => {
      console.error(error);
    }
  })

  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //pickimage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalOpen(true);
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
        const filename = my_id.toString()
        const ref = firebase.storage().ref().child(filename);
  
        const snapshot = await ref.put(blob);
  
        // Get download URL
        const downloadURL = await snapshot.ref.getDownloadURL();
  
        // Store download URL
        updateFn.mutate({ pic: downloadURL });
  
        setModalOpen(false);
        setUploading(false);
        //setImage(null);
  
      } catch (error) {
        console.error(error);
        //setImage(null);
        setModalOpen(false);
        setUploading(false);
      }
    };



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
            <TouchableOpacity 
              style={tw`mx-2`}
              onPress={() => pickImage()}
            >
              <Image 
                style={tw`h-22 w-22 rounded-full`} 
                source={{ uri: self?.pic }}
              />
            </TouchableOpacity>
            <Pressable 
              style={tw`mx-2 flex-row justify-center items-center h-22 w-22 rounded-full `}
              onPress={() => navigation.push('Avatars')}
            >
              {
                self?.lottie ? (
                  <LottieView 
                    source={{ uri: self.lottie }} 
                    style={{width:'100%', height:'100%'}}
                  />
                ):(
                  <Text style={tw`text-white/50 text-lg `}>None</Text>
                )
              }
            </Pressable>
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
          <Pressable 
            style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`}
            onPress={() => navigation.push('Edit', {
              fieldType: 'full_name',
              value: self?.full_name ? self.full_name : ''
            })} 
          >
            <Text style={tw`text-white/50`}>Name</Text>
            <Text style={tw`text-white text-lg`}>{self?.full_name ? self.full_name : ''}</Text>
          </Pressable>
          <Pressable 
            style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`} 
            onPress={() => navigation.push('Edit', {
              fieldType: 'Email',
              value: self?.email
            })}
          >
            <Text style={tw`text-white/50`}>Email</Text>
            <Text style={tw`text-white text-lg`}>{self?.email}</Text>
          </Pressable>
          <Pressable 
            style={tw`flex-col pb-1 border-b-2 border-white/50 mb-4`} 
            onPress={() => navigation.navigate('Edit', {
              fieldType: 'Password'
            })}
          >
            <Text style={tw`text-white/50`}>Password</Text>
            <Text style={tw`text-white text-lg`}>************</Text>
          </Pressable>
        </View>

        <View style={tw`flex-col items-end absolute bottom-0 right-5`}>
          <TouchableOpacity style={tw`mb-3`} onPress={() => navigation.push('Notifications')} >
            <Text style={tw`text-blue-600 text-lg`}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`mb-3`} onPress={() => navigation.push('Login3')}>
            <Text style={tw`text-red-700/50 text-lg`}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw``} >
            <Text style={tw`text-red-700/50 text-lg`}>Delete account</Text>
          </TouchableOpacity>
        </View>



      </SafeAreaView>

      <Modal
        animationIn="zoomIn"
        animationInTiming={100}
        animationOut="zoomOut"
        animationOutTiming={100}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        isVisible={modalOpen}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        onSwipeComplete={() => setModalOpen(false)}
        swipeThreshold={10}
        swipeDirection={["down", "left", "right", "up"]}
        useNativeDriverForBackdrop={true}
        style={tw` mx-5  `}
      >
        <View style={tw`bg-black rounded-xl p-8`}>
          <View style={tw`flex-col items-center   `}>
            <Image
              style={tw`h-50 w-50 rounded-full mb-8 mx-6`}
              source={{ uri: image }}
            />
            <View style={tw`flex-row justify-between  `}>
              <TouchableOpacity 
                style={tw`p-2 px-6 flex-row items-center`} 
                onPress={() => {
                  setModalOpen(false);
                  //setImage(null);
                }}
              >
                  <Ionicons name="close" size={25} style={tw`text-white/80`} />
                 <Text style={tw`text-white text-lg ml-2`}>Cancel</Text>
              </TouchableOpacity>

              {
                uploading ? (
                  <View style={tw`p-3 px-11`}>
                    <ActivityIndicator />
                  </View>
                ):(
                  <TouchableOpacity 
                    style={tw`p-2 px-6 rounded-full bg-blue-600`}
                    onPress={() => uploadMedia()}
                  >
                    <Text style={tw`text-white text-lg`}>Confirm</Text>
                  </TouchableOpacity>
                )
              }

            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}