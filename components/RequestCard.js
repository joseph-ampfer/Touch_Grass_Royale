import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';

export default function RequestCard({ user, onPicturePress }) {
  return (
    <View 
      style={[tw`mx-5 mb-3 rounded-3xl  flex-row justify-around items-center p-2`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}
    >
      
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
        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50 mt-1 text-lg font-semibold w-37`}>{user.name}</Text>
      </TouchableOpacity>

      <View style={tw`flex-col justify-center items-center `}>
        <TouchableOpacity style={tw`rounded-xl bg-blue-600 p-3 px-6 mb-2`}>
          <Text style={tw`text-white`} >Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`rounded-xl bg-gray-900 p-2 px-6 `}>
          <Text style={tw`text-white`} >Ignore</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}