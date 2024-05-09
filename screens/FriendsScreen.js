import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import LottieView from 'lottie-react-native';
import ProfileModal from '../components/ProfileModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUserFriendsList, getSomeOneElsesFriendsList, removeFriend, sendFriendRequest, unsendFriendRequest } from '../apiFetches/fetches';
import MagicalLoader from '../components/MagicalLoader';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Modal from 'react-native-modal';

// const friends = [
//   {
//     name: 'JohnDoe',
//     time: '524',
//     pic: 'https://i.pravatar.cc/600/',
//     lottie: 'spaceJam',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Hexscuseme',
//     time: '500',
//     pic: 'https://i.pravatar.cc/60',
//     lottie: 'gojoCat',
//     action: 'Remove Friend'
//   },
//   {
//     name: 'Nephlauxic',
//     time: '499',
//     pic: 'https://i.pravatar.cc/60/68',
//     lottie: null,
//     action: 'Add Friend'
//   },
//   {
//     name: 'Hobbes',
//     time: '461',
//     pic: 'https://i.pravatar.cc/60/63',
//     lottie: 'spaceInvader',
//     action: 'Add Friend'
//   },
//   {
//     name: 'eener_weiner',
//     time: '444',
//     pic: 'https://i.pravatar.cc/60/64',
//     lottie: null,
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test 6',
//     time: '443',
//     pic: 'https://i.pravatar.cc/60/65',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'jampfer',
//     time: '411',
//     pic: 'https://i.pravatar.cc/60/66',
//     lottie: 'eyeBlob',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Dennis',
//     time: '400',
//     pic: 'https://i.pravatar.cc/60/67',
//     lottie: 'ramen',
//     action: 'Add Friend'
//   },
//   {
//     name: 'frobro',
//     time: '399',
//     pic: 'https://i.pravatar.cc/60/69',
//     lottie: 'meditationCow',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 4',
//     time: '350',
//     pic: 'https://i.pravatar.cc/60/70',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 5',
//     time: '300',
//     pic: 'https://i.pravatar.cc/60/80',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 6',
//     time: '100',
//     pic: 'https://i.pravatar.cc/60/90',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 1',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/10',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 2',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/20',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 3',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/30',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 4',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/40',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Test test 5',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
//   {
//     name: 'Last',
//     time: '9.2',
//     pic: 'https://i.pravatar.cc/60/60',
//     lottie: 'ghibliGirl',
//     action: 'Add Friend'
//   },
// ]

export default function FriendsScreen({ route, navigation }) {
  const userID = route.params?.userID; // Use optional chaining
  const username = route.params?.username; // modify usage
  const isCurrentUser = route.params?.isCurrentUser; // Default to true if not provided
  const insets = useSafeAreaInsets();
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);


  const { data: friends, isLoading, error } = useQuery({
    queryKey: ['friends', userID],
    queryFn: 
      isCurrentUser ? () => getCurrentUserFriendsList() : () => getSomeOneElsesFriendsList(userID)
  })

  const queryClient = useQueryClient();

  const removefn = useMutation({
    mutationFn: (friendID) => removeFriend(friendID),
    gcTime: 0,
    onSuccess: () => {
      setRemoveModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['friends', userID] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (error) => {
      console.error('Error removing friend', error.detail)
    }
  })

  const sendFRfn = useMutation({
    mutationFn: (friendID) => sendFriendRequest(friendID),
    gcTime: 0,
    onSuccess: () => {
      alert('Friend request sent');
      queryClient.invalidateQueries({ queryKey: ['friends', userID] });
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })

  const unsendFRfn = useMutation({
    mutationFn: (friendID) => unsendFriendRequest(friendID),
    gcTime: 0,
    onSuccess: () => {
      alert('Friend request unsent');
      queryClient.invalidateQueries({ queryKey: ['friends', userID] })
    },
    onError: (error) => {
      console.error(error.detail)
    }
  })
  
  const isLoading2 = 0;

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
          <Text style={tw`text-white text-2xl font-bold ml-6`}>{username}</Text>
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
{/* =====TOP BAR===== */}
        <View style={tw`flex-row items-center ml-3 mt-4`}>
          <TouchableOpacity onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold ml-6`}>{username}</Text>
        </View>

        <View style={tw`flex-row justify-center items-center pb-3 mt-5 border-b-2 border-gray-800`}>
          <Text style={tw`text-slate-50  text-center text-lg`}>{friends.length} friends</Text>
        </View>

{/* ========SCROLLVIEW FRIENDS LIST====== */}
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
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
                    {/* pic or lottie */}
                    {
                      friend.lottie? (
                        <View style={tw`h-13 w-13 rounded-full mr-4`}>
                          <LottieView
                            source={{ uri: friend.lottie }}
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
                    {/* username and fullname */}
                    {
                      friend.full_name? (
                        <View style={tw`flex-col justify-center items-center`}>
                          <Text 
                            numberOfLines={1} ellipsizeMode='tail' 
                            style={tw`text-slate-50  text-lg  w-40`}>{friend.username}</Text>
                          <Text 
                            numberOfLines={1} ellipsizeMode='tail' 
                            style={tw`text-slate-50/70   w-40`}>{friend.full_name}</Text>
                        </View>
                      ):(
                        <View>
                          <Text 
                            numberOfLines={1} ellipsizeMode='tail' 
                            style={tw`text-slate-50 mt-1 text-lg  w-40`}>{friend.username}</Text>
                        </View>
                      )
                    }
                  </TouchableOpacity>

                  {
                    isCurrentUser? (
                      <TouchableOpacity 
                        style={tw`rounded-lg bg-gray-800 p-2 px-4`}
                        onPress={() => {
                          setSelectedUser(friend);
                          setRemoveModalOpen(true);
                        }}
                      >
                        <Text style={tw`text-white font-bold`}>Remove</Text>
                      </TouchableOpacity>
                    ):
                      friend.action == 'Remove'? (
                        <TouchableOpacity 
                          style={tw`rounded-lg bg-gray-800 p-2 px-4`}
                          onPress={() => {
                            setSelectedUser(friend);
                            setRemoveModalOpen(true);
                          }}
                        >
                          <Text style={tw`text-white font-bold`}>Remove</Text>
                        </TouchableOpacity>
                      ):
                      friend.action == 'Sent'? (
                        <TouchableOpacity 
                          style={tw`rounded-lg bg-gray-800 p-2 px-4`}
                          onPress={() => unsendFRfn.mutate(friend.id)}
                        >
                          <Text style={tw`text-white font-bold`}>Sent</Text>
                        </TouchableOpacity>
                      ):(
                        <TouchableOpacity 
                          style={tw`rounded-lg bg-blue-600 p-2 px-4`}
                          onPress={() => sendFRfn.mutate(friend.id) }
                        >
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

{/* =========Are you sure you want to remove friend?========= */}
    <Modal 
      animationIn='zoomIn' 
      animationInTiming={300}
      animationOut='zoomOut'
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      isVisible={removeModalOpen}
      onBackButtonPress={() => setRemoveModalOpen(false)}
      onBackdropPress={() => setRemoveModalOpen(false)}
      onSwipeComplete={() => setRemoveModalOpen(false)}
      swipeThreshold={10}
      swipeDirection={['down', 'left', 'right', 'up']}
      useNativeDriverForBackdrop={true}
      style={tw`justify-center items-center m-auto  `}
    >
      <View style={tw`bg-gray-900 rounded-xl mx-5  pt-3`}>
        <View style={tw`flex-col justify-center `}>
  
      {/*================ top part=============== */}
          <View style={tw`px-5 flex-col items-center`}>
  
      {/* ===========PICTURE ROW========= */}
            <View style={tw`flex-row items-center justify-around  mt-1`}>
              {
                selectedUser.lottie? (
                  <View style={tw`h-36 w-36 rounded-full mx-4`}>
                    <LottieView 
                        source={{ uri: selectedUser.lottie }} 
                        style={{width:'100%', height:'100%'}}
                        autoPlay 
                        loop 
                        speed={1}
                    />
                  </View> 
                ):(
                  <Image 
                  source={{ uri: selectedUser.pic }} 
                  style={tw`h-30 w-30 rounded-full mx-4 `}
                />
                )
              }   
            </View>
            {/* ===NAME===*/}
            {
              selectedUser.full_name? (
                <View style={tw`flex-col justify-center items-center w-78 `}>
                  <Text 
                    numberOfLines={1} ellipsizeMode='tail'
                    style={tw`text-white text-3xl font-bold text-center mt-3`}>{selectedUser.username}</Text>
                  <Text 
                    numberOfLines={1} ellipsizeMode='tail'
                    style={tw`text-white/40 text-base text-center`}>{selectedUser.full_name}</Text>
                </View>
              ):(
                <View style={tw`flex-col justify-center items-center w-78 `}>
                  <Text 
                    numberOfLines={1} ellipsizeMode='tail'
                    style={tw`text-white text-3xl font-bold text-center mt-3`}>{selectedUser.username}</Text>
                </View>
              )
            }
          </View>
  
      {/* ============bottom part============ */}
          <View style={tw`bg-gray-800 rounded-t-xl pt-3 pb-3 mt-2 px-15 rounded-b-xl `}>
            <Text style={tw`text-red-500 text-lg text-center flex-wrap `}>
              Are you sure you want to remove {selectedUser.username} as your friend?
            </Text>
            <View style={tw`flex-row justify-between items-center mt-3`}>
              <TouchableOpacity 
                style={tw``}
                onPress={() => removefn.mutate(selectedUser.id)}
              >
                <Text style={tw`text-white text-base`}>Remove Friend</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`bg-blue-600 p-2 px-6 rounded-md`}
                onPress={() => setRemoveModalOpen(false)}
              >
                <Text style={tw`text-white text-base`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>  
  
        </View>
      </View>
    </Modal>



      </SafeAreaView>


    </View>
  )
}