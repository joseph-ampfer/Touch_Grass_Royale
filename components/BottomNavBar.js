import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`bg-black pt-2 flex-row justify-around z-50 absolute bottom-0 w-full`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Foundation name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={31} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
          <Ionicons name="podium-outline" size={31} color="white" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity> 
      </View>
    </View>
  )
};