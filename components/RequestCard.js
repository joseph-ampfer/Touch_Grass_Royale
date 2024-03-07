import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RequestCard({user}) {
  return (
    <View style={[tw`mr-0 ml-3 rounded-3xl  flex-col items-center p-2`, {backgroundColor: 'rgba(255,255,255,0.2)'}]}>
      
      <View style={tw`flex-row items-center`}>
        <Image source={{ uri: user.pic}} style={tw`h-15 w-15 rounded-full mt-2 mr-3`} />
        <Text style={tw`text-white mt-1 text-base`}>{user.name}</Text>
      </View>

      <View style={tw`flex-row items-center `}>
        <TouchableOpacity style={tw`rounded-xl bg-blue-600 p-2 px-5 mt-2 mb-2 mr-2`}>
          <Text style={tw`text-white`} >Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`rounded-xl bg-gray-900 p-2 px-5 mt-2 mb-2`}>
          <Text style={tw`text-white`} >Ignore</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}