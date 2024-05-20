import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screens = ['Home', 'Search', 'Leaderboard', 'Profile']

export default function BottomNavBar() {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState('Search');

  return (
    <View>
      <View style={tw`bg-black pt-2 flex-row justify-around z-50 absolute bottom-0 w-full`}>
        <TouchableOpacity style={tw`px-2`} onPress={() => navigation.push('Home')}>
          <Foundation name="home" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`px-2`} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={31} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`px-2`} onPress={() => navigation.navigate('Leaderboard')}>
          <Ionicons name="podium-outline" size={31} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={tw`px-2`} onPress={() => navigation.push('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
};




//{
//  screens.map(screen => {
//    if (screen == activeScreen) {
//      if (screen == 'Home') {
//        return (
//          <TouchableOpacity key={screen} >
//            <MaterialCommunityIcons name="home" size={34} color="white" />
//          </TouchableOpacity>
//        )
//      } else if (screen == 'Search') {
//        return (
//          <TouchableOpacity key={screen} >
//            <Ionicons name="search" size={31} color="white" />
//          </TouchableOpacity>
//        )
//      } else if (screen == 'Leaderboard') {
//        return (
//          <TouchableOpacity key={screen} >
//            <Ionicons name="podium" size={31} color="white" />
//          </TouchableOpacity>
//        )
//      } else {
//        return (
//          <TouchableOpacity key={screen} >
//            <Ionicons name="person-circle" size={32} color="white" />
//          </TouchableOpacity>
//        )
//      }
//
//    } else {
//      if (screen == 'Home') {
//        return (
//          <TouchableOpacity key={screen} onPress={() => {
//            setActiveScreen(screen);
//            navigation.navigate(screen);
//          }} >
//            <MaterialCommunityIcons name="home-outline" size={34} color="white" />
//          </TouchableOpacity>
//        )
//      } else if (screen == 'Search') {
//        return (
//          <TouchableOpacity key={screen} onPress={() => {
//            setActiveScreen(screen);
//            navigation.navigate(screen);
//          }} >
//            <Ionicons name="search-outline" size={31} color="white" />
//          </TouchableOpacity>
//        )
//      } else if (screen == 'Leaderboard') {
//        return (
//          <TouchableOpacity key={screen} onPress={() => {
//            setActiveScreen(screen);
//            navigation.navigate(screen);
//          }} >
//            <Ionicons name="podium-outline" size={31} color="white" />
//          </TouchableOpacity>
//        )
//      } else {
//        return (
//          <TouchableOpacity key={screen} onPress={() => {
//            setActiveScreen(screen);
//            navigation.navigate(screen);
//          }} >
//            <Ionicons name="person-circle-outline" size={32} color="white" />
//          </TouchableOpacity>
//        )
//      }
//    }
//  })
//}