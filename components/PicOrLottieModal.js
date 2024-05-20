import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Portal } from "react-native-portalize";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebaseConfig";
import * as FileSystem from "expo-file-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../apiFetches/fetches";
import { Ionicons } from '@expo/vector-icons';
import { my_id } from "../secrets";

export default function PicOrLottieModal({ pOLModalOpen, setPOLModalOpen }) {
  const navigation = useNavigation();

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
      const filename = '/images/' + my_id.toString()
      const ref = firebase.storage().ref().child(filename);

      const snapshot = await ref.put(blob);

      // Get download URL
      const downloadURL = await snapshot.ref.getDownloadURL();

      // Store download URL
      updateFn.mutate({ pic: downloadURL });

      setPOLModalOpen(false);
      setUploading(false);
      setImage(null);

      // Clean up blob
      if (blob.close) {
        blob.close(); // Free up memory
      }


    } catch (error) {
      console.error(error);
      setImage(null);
      setUploading(false);
    }
  };

  return (
    <Portal>
      <Modal
        animationIn="zoomIn"
        animationInTiming={200}
        animationOut="zoomOut"
        animationOutTiming={100}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={100}
        isVisible={pOLModalOpen}
        onBackButtonPress={() => setPOLModalOpen(false)}
        onBackdropPress={() => setPOLModalOpen(false)}
        onSwipeComplete={() => setPOLModalOpen(false)}
        swipeThreshold={10}
        swipeDirection={["down", "left", "right", "up"]}
        useNativeDriverForBackdrop={true}
        style={tw`flex-row justify-center items-center  `}
      >
        <View style={tw`bg-neutral-800 rounded-xl    w-9/10`}>
          {
            image ? (
              <View style={tw`flex-col pt-4  `}>
                <View style={tw`flex-row justify-center items-center`}>
                  <Image
                    style={tw`h-50 w-50 rounded-full mb-8 mx-6`}
                    source={{ uri: image }}
                  />
                </View>

                <View style={tw`flex-col justify-between  `}>
                  {
                    uploading ? (
                      <View style={tw`p-3 border-t-2 border-neutral-700/10`}>
                        <ActivityIndicator />
                      </View>
                    ):(
                      <TouchableOpacity 
                        style={tw`flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`}
                        onPress={() => uploadMedia()}
                      >
                        <Text style={tw`text-blue-500 text-lg font-bold text-center`}>Confirm</Text>
                      </TouchableOpacity>
                    )
                  }

                  <TouchableOpacity 
                    style={tw`flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`} 
                    onPress={() => setImage(null)}
                  >
                    <Text style={tw`text-white text-lg text-center`}>Cancel</Text>
                  </TouchableOpacity>

                </View>
              </View>
          ):(
            <View style={tw`flex-col items-center justify-around py-5 `}>
              <TouchableOpacity
                style={tw`border-2 border-white rounded-full p-2 px-5`}
                onPress={() => {
                  pickImage();
                }}
              >
                <Text style={tw`text-white font-bold text-lg`}>
                  Choose from device
                </Text>
              </TouchableOpacity>
              <View style={tw`p-3`}>
                <Text style={tw`text-white font-bold text-lg`}>Or</Text>
              </View>
              <TouchableOpacity
                style={tw` rounded-full p-2 px-5 bg-blue-600`}
                onPress={() => {
                  setPOLModalOpen(false);
                  navigation.push("Avatars");
                }}
              >
                <Text style={tw`text-white  text-lg`}>
                  Your unlocked avatars
                </Text>
              </TouchableOpacity>
            </View>
            )
          }

        </View>
      </Modal>
    </Portal>
  );
}
