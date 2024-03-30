import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import LottieView from 'lottie-react-native';
import animations from '../animations/animations';
import ProfileModal from '../components/ProfileModal';

const friends = [
  {
    name: 'JohnDoe',
    time: '524',
    pic: 'https://i.pravatar.cc/600/',
    lottie: 'spaceJam',
    action: 'Add Friend'
  },
  {
    name: 'Hexscuseme',
    time: '500',
    pic: 'https://i.pravatar.cc/60',
    lottie: 'gojoCat',
    action: 'Remove Friend'
  },
  {
    name: 'Nephlauxic',
    time: '499',
    pic: 'https://i.pravatar.cc/60/68',
    lottie: null,
    action: 'Add Friend'
  },
  {
    name: 'Hobbes',
    time: '461',
    pic: 'https://i.pravatar.cc/60/63',
    lottie: 'spaceInvader',
    action: 'Add Friend'
  },
  {
    name: 'eener_weiner',
    time: '444',
    pic: 'https://i.pravatar.cc/60/64',
    lottie: null,
    action: 'Add Friend'
  },
  {
    name: 'Test 6',
    time: '443',
    pic: 'https://i.pravatar.cc/60/65',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'jampfer',
    time: '411',
    pic: 'https://i.pravatar.cc/60/66',
    lottie: 'eyeBlob',
    action: 'Add Friend'
  },
  {
    name: 'Dennis',
    time: '400',
    pic: 'https://i.pravatar.cc/60/67',
    lottie: 'ramen',
    action: 'Add Friend'
  },
  {
    name: 'frobro',
    time: '399',
    pic: 'https://i.pravatar.cc/60/69',
    lottie: 'meditationCow',
    action: 'Add Friend'
  },
  {
    name: 'Test test 4',
    time: '350',
    pic: 'https://i.pravatar.cc/60/70',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 5',
    time: '300',
    pic: 'https://i.pravatar.cc/60/80',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 6',
    time: '100',
    pic: 'https://i.pravatar.cc/60/90',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 1',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/10',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 2',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/20',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 3',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/30',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 4',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/40',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Test test 5',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/60',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
  {
    name: 'Last',
    time: '9.2',
    pic: 'https://i.pravatar.cc/60/60',
    lottie: 'ghibliGirl',
    action: 'Add Friend'
  },
]

export default function FriendsScreen({ route, navigation }) {
  const userId = route.params?.userId; // Use optional chaining
  const isCurrentUser = route.params?.isCurrentUser ?? true; // Default to true if not provided
  const insets = useSafeAreaInsets();
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light' />
      <SafeAreaView style={tw`flex-1`}>
{/* =====TOP BAR===== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>joey_ampfer</Text>
        </View>

        <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
          <Text style={tw`text-slate-50  text-center text-lg`}>{friends.length} friends</Text>
        </View>

{/* ========SCROLLVIEW FRIENDS LIST====== */}
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 45 }}>
          {
            friends.map((friend, index) => {
              return (
                // friend component
                <View key={index} style={tw`mx-5 mb-3 flex-row justify-between items-center p-2`}>

                  <TouchableOpacity 
                    style={tw`flex-row items-center`}
                    onPress={() => {
                      setSelectedUser(friend);
                      setModalOpen(true);
                    }}
                  >
                    {
                      friend.lottie? (
                        <View style={tw`h-13 w-13 rounded-full mr-4`}>
                          <LottieView
                            source={animations[friend.lottie]}
                            style={tw`h-full w-full `}
                            autoPlay={false}
                            loop={false}
                            speed={1}
                          />
                        </View>
                      ):(
                        <Image source={{ uri: friend.pic }} style={tw`h-13 w-13 rounded-full mr-4`} />
                      )
                    }
                    <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50 mt-1 text-lg  w-37`}>{friend.name}</Text>
                  </TouchableOpacity>

                  {
                    isCurrentUser? (
                      <TouchableOpacity style={tw`rounded-lg bg-gray-800 p-2 px-4`}>
                        <Text style={tw`text-white font-bold`}>Remove</Text>
                      </TouchableOpacity>
                    ):
                      friend.action === 'Remove Friend'? (
                        <TouchableOpacity style={tw`rounded-lg bg-gray-800 p-2 px-4`}>
                          <Text style={tw`text-white font-bold`}>Remove</Text>
                        </TouchableOpacity>
                      ):(
                        <TouchableOpacity style={tw`rounded-lg bg-blue-600 p-2 px-4`}>
                          <Text style={tw`text-white font-bold`}>Add Friend</Text>
                        </TouchableOpacity>
                      )
                  }



                </View>
              )
            })
          }
        </ScrollView>

{/* ================PROFILE MODAL================ */}
        <ProfileModal
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          selectedUser={selectedUser}
        />

      </SafeAreaView>

{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar />

    </View>
  )
}