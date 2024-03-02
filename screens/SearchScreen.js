import { View, Text, TouchableOpacity, TextInput, Image, } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Foundation } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import { useIsFocused } from '@react-navigation/native';



export default function SearchScreen({ navigation }) {
  const [showSearch, toggleSearch] = useState(false);
  const [addedUsers, setAddedUsers] = useState({});
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      time: '500',
      pic: 'https://i.pravatar.cc/600/'
    },
    {
      id: 2,
      name: 'Tupac',
      time: '400',
      pic: 'https://i.pravatar.cc/60'
    },
    {
      id: 3,
      name: 'Jampfer',
      time: '399',
      pic: 'https://i.pravatar.cc/60/68'
    }
]);

//CLEANUP
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
        toggleSearch(false);
        setAddedUsers({});
    }
  }, [isFocused]);

  const handleAddedFriend = (userID) => {
    console.log(userID)
  }

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      <StatusBar style='light'/>
      <Image blurRadius={10} source={require('../assets/images/panda3.png')} style={tw`absolute w-full h-full`} />
      <SafeAreaView style={tw`flex-1`}>
        <View style={[tw`bg-slate-200 mx-5 rounded-full  flex-row justify-end`, {backgroundColor: showSearch? 'rgba(255,255,255,0.2)': 'transparent'}]}>
{/* =============SEARCH INPUT============== */}
          {
            showSearch? (
              <TextInput
                placeholder='Search for friends'
                placeholderTextColor={'gray'}
                style={tw`flex-1 text-base pl-6 `}
              />
            ):null
          }
{/* ===============MAGNIFYING GLASS BUTTON============= */}
          <TouchableOpacity 
            style={[tw`rounded-full m-1`, {backgroundColor: showSearch? 'transparent': 'rgba(255,255,255,0.2)'}]}
            onPress={() => toggleSearch(!showSearch)}
            touchSoundDisabled={true}
          >
            <Ionicons style={tw`p-2`} name="search-outline" size={31} color="white" />
          </TouchableOpacity>
{/* ================SEARCH RESULTS===================== */}
          {
            users.length > 0 && showSearch? (
              <View style={tw`absolute w-full bg-gray-100 top-16 rounded-3xl`}>
                {
                  users.map((user, index) => {
                    let showBorder = index + 1 != users.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-400`: ``;
                    return (
                      <View
                        key={index}
                        style={tw.style(['flex-row', 'items-center', 'p-3', 'border-0', 'px-4', 'mb-1', 'justify-between'], borderClass)}
                      >
                        <View style={tw`flex-row items-center `}>
                            <Image 
                              source={{ uri: user.pic }} 
                              style={tw`h-10 w-10 rounded-full mr-2`}
                            />
                            <Text style={tw`text-black text-lg`}>{user.name}</Text>
                        </View>
{/* ================FRIEND BUTTON================ */}
                        <TouchableOpacity 
                          style={tw.style('p-3', 'px-5', 'rounded-3xl', 'self-end', 'bg-blue-600', {'bg-slate-600': addedUsers[user.id]}, )}
                          onPress={() => {
                            setAddedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }));
                            handleAddedFriend(user.id);
                          }}
                        >
                          <Text style={tw.style('text-white', )}>{addedUsers[user.id]? 'Undo' : 'Add Friend'}</Text>                         
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  )
                }
              </View>
            ):null
          }

        </View>

      </SafeAreaView>
      {/* ============BOTTOM NAV-BAR========== */}
      <BottomNavBar/>
    </View>
  )
}