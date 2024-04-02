import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriendRequest, denyFriendRequest, undoIgnoreRequest } from '../api/fetches';
import { FontAwesome5 } from '@expo/vector-icons';



export default function FriendRequestCard({ user, onPicturePress }) {
  const queryClient = useQueryClient();

  const acceptfn = useMutation({
    mutationFn: () => acceptFriendRequest(user.id),
    onSuccess: () => {
      setAccepted(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
    },
    onError: (error) => {
      console.error("Error accepting friend request:", error)
    },
  });

  const denyfn = useMutation({
    mutationFn: () => denyFriendRequest(user.id),
    onSuccess: () => {
      setIgnored(true);
    },
    onError: (error) => {
      console.error("Error denying freind request:", error)
    },
  });

  const undofn = useMutation({
    mutationFn: () => undoIgnoreRequest(user.id),
    onSuccess: () => {
      setIgnored(false);
    },
    onError: (error) => {
      console.error("Error undoing the ignore:", error)
    }
  });

  const [accepted, setAccepted] = useState(false);
  const [ignored, setIgnored] = useState(false);


  return (
    <View 
      style={[tw`mx-5 mb-3 rounded-3xl  flex-row justify-between items-center p-2`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
    >
      {/* ====PIC AND USERNAME=== */}
      <TouchableOpacity 
        style={tw`flex-row justify-center items-center`}
        onPress={onPicturePress}
      >
        {
          user.lottie? (
            <View style={tw`h-18 w-18 rounded-full  mr-3`}>
              <LottieView
                source={animations[user.lottie]}
                style={tw`h-full w-full `}
                autoPlay
                loop={false}
                speed={1}
              />
            </View>
          ):(
            <Image source={{ uri: user.pic}} style={tw`h-18 w-18 rounded-full  mr-3`} />
          )
        }
        {/* username & fullname */}
        {
          user.full_name? (
            <View style={tw`flex-col`}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50 mt-1 text-lg font-semibold w-37`}>{user.username}</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50/50 mt-1 text-base font-semibold w-37`}>{user.full_name}</Text>
            </View>
          ):(
            <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50 mt-1 text-lg font-semibold w-37`}>{user.username}</Text>
          )
        }

      </TouchableOpacity>

      {/* =========BUTTONS======== */}
      {
        !ignored && !accepted ? (
          <View style={tw`flex-col justify-center items-center `}>
            <TouchableOpacity 
              style={tw`rounded-xl bg-blue-600 p-3 px-6 mb-2`}
              onPress={() => acceptfn.mutate()}
            >
              <Text style={tw`text-white`} >Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`rounded-xl bg-gray-900/50 p-2 px-6 `}
              onPress={() => denyfn.mutate()}
            >
              <Text style={tw`text-white`} >Ignore</Text>
            </TouchableOpacity>
          </View>
        ): accepted ? (
          <View style={tw`flex-col justify-center items-center `}>
            <FontAwesome5 style={tw`p-4 px-6 my-3`} name="user-friends" size={28} color="white" />
          </View>
        ):(
          <View style={tw`flex-col justify-center items-center `}>
            <Text style={tw`text-white  p-3 px-6 mb-2`} >Ignored</Text>
            <TouchableOpacity 
              style={tw`rounded-xl bg-gray-900/50 p-2 px-6 `}
              onPress={() => undofn.mutate()}
            >
              <Text style={tw`text-white`} > Undo </Text>
            </TouchableOpacity>
          </View>
        )
      }


    </View>
  )
}