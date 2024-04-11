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
import { changePic } from "../api/fetches";
import { Ionicons } from '@expo/vector-icons';

export default function PicOrLottieModal({ pOLModalOpen, setPOLModalOpen }) {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const changePicFn = useMutation({
    mutationFn: (url) => changePic(url),
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

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      const snapshot = await ref.put(blob);

      // Get download URL
      const downloadURL = await snapshot.ref.getDownloadURL();

      // Store download URL
      console.log(downloadURL);
      changePicFn.mutate(downloadURL);

      setPOLModalOpen(false);
      setUploading(false);
      setImage(null);

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
        animationInTiming={300}
        animationOut="zoomOut"
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        isVisible={pOLModalOpen}
        onBackButtonPress={() => setPOLModalOpen(false)}
        onBackdropPress={() => setPOLModalOpen(false)}
        onSwipeComplete={() => setPOLModalOpen(false)}
        swipeThreshold={10}
        swipeDirection={["down", "left", "right", "up"]}
        useNativeDriverForBackdrop={true}
        style={tw` mx-5  `}
      >
        <View style={tw`bg-black rounded-xl p-8`}>
          {
            image ? (
              <View style={tw`flex-col items-center   `}>
                <Image
                  style={tw`h-50 w-50 rounded-full mb-8 mx-6`}
                  source={{ uri: image }}
                />
                <View style={tw`flex-row justify-between  `}>
                  <TouchableOpacity style={tw`p-2 px-6 flex-row items-center`} onPress={() => setImage(null)}>
                    <Ionicons name="arrow-back" size={20} color="white" />
                    <Text style={tw`text-white text-lg ml-2`}>Back</Text>
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
          ):(
            <View style={tw`flex-col items-center justify-around `}>
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
