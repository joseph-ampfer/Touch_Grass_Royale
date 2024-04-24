import { View, Text, TextInput, Image, Dimensions, Pressable, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown } from 'react-native-reanimated';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import debounce from '../debounce/debounce';
import { ScrollView, GestureHandlerRootView, TouchableOpacity, RefreshControl } from 'react-native-gesture-handler';
import FriendRequestCard from '../components/FriendRequestCard';
import LottieView from 'lottie-react-native';
import { Portal } from 'react-native-portalize';
import ProfileModal from '../components/ProfileModal';
import animations from '../animations/animations';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFriendRequests, removeFriend, searchForUsers, sendFriendRequest, unsendFriendRequest } from '../apiFetches/fetches';
import Modal from 'react-native-modal'
import PopUp from '../components/PopUp';



const TAB_WIDTH = 150;


export default function RegFriendsScr({ navigation }) {

   const queryClient = useQueryClient();

   const sendFRfn = useMutation({
    mutationFn: (friendID) => sendFriendRequest(friendID),
    gcTime: 0,
    onSuccess: () => {
      alert('Sent friend request');
      handleSearchForUsers(findTextInput);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
    },
    onError: (error) => {
      console.error(error)
    }
   })

   const unsendFRfn = useMutation({
    mutationFn: (friendID) => unsendFriendRequest(friendID),
    gcTime: 0,
    onSuccess: () => {
      alert('Unsent friend request');
      handleSearchForUsers(findTextInput);
    },
    onError: (error) =>{
      console.error(error)
    }
   })

   const removefn = useMutation({
    mutationFn: (friendID) => removeFriend(friendID),
    gcTime: 0,
    onSuccess: () => {
      alert('Removed friend');
      handleSearchForUsers(findTextInput);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    }
   })


  const [addedUsers, setAddedUsers] = useState({});
  const [addedInvites, setAddedInvites] = useState({});

  const findUsersInputRef = useRef(null);
  const inviteContactsRef = useRef(null);
  const [findFocused, setfindFocused] = useState(false);
  const [inviteFocused, setInviteFocused] = useState(false);
  const [findTextInput, setFindTextInput] = useState('');
  const [inviteTextInput, setInviteTextInput] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [contactsData, setConstactsData] = useState([]);
  const [tab, setTab] = useState('Find');
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);



///CLEANUP
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
        setAddedUsers({});
        setConstactsData([]);
    }
  }, [isFocused]);


  // ===========TODO==================
  const handleAddedFriend = (userID) => {
    console.log(userID)
  }

  //===========TODO==============
  const handleInviteFriendSMS = async (number) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      console.log(isAvailable);
      const { result } = await SMS.sendSMSAsync(
        [number],
        '(testing, ignore) https://play.google.com/store/apps/details?id=com.instagram.android',
        {}
      );
    } else {
      // misfortune... there's no SMS available on this device
      console.log(isAvailable);
    }
  }

 //==============SLIDER============
  const offset = useSharedValue(27);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}]
  }))
  const handlePress = (tab) => {
    const newOffset = (() => {
      switch (tab) {
        case 'Find':
          return 27;
        case 'Invite':
          return 277;
        default:
          return 0
      }
    })();
    offset.value = withTiming(newOffset)
  }
// ^^^^^^^^^^^^^SLIDER^^^^^^^^^^^^^^^^^


const handleSearchForUsers = async input => {
  if (input == '') {
    setSearchResults([]);
    return
  }
  try {
    const response = await searchForUsers(input);
    setSearchResults(response);
  } catch (error) {
    console.error(error.detail)
  }
}
const debounceSearchForUsers = debounce(handleSearchForUsers, 500)


const handleContactsSearch = async value => {
  console.log('value: ', value);
  if (value == '') {
    setConstactsData([]);
  } else {
    const { status } = await Contacts.requestPermissionsAsync();
    console.log(status)
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        name: value,
        pageSize: 10,
        fields: ["phoneNumbers", "rawImage", "name"]
      });
      console.log(data);
      if (data.length > 0) {
        setConstactsData(data);
        //const contact = data;
        //for (let key in contact) {
        //  console.log(key, contact[key])
        //}
        //console.log(contact);
      }
    }
  }
}
const debounceContactsSearch = debounce(handleContactsSearch, 500)


const [popTitle, setPopTitle] = useState('Connect with friends?');
const [popMsg, setPopMsg] = useState("Cant be the best with no one to compete against! Send friend requests and invite others to the app.");
const [popOkMsg, setPopOkMsg] = useState('Add friends');
const [popNoMsg, setPopNoMsg] = useState('Skip');
const [popNoFn, setPopNoFn] = useState(() => () => {
  setPopUpOpen(false) 
  navigation.navigate('Home')
});
const [popUpOpen, setPopUpOpen] = useState(true);

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
    <View style={tw`flex-1 bg-black`}>
      <StatusBar style='light'/>
      {/* <Image blurRadius={10} fadeDuration={100} 
        source={require('../assets/images/full.png')} 
        style={[tw`absolute w-full  -z-50`, { height: screenDimensions.height } ]} /> */}
      <SafeAreaView style={tw`flex-1`}>
{/* ================TOP TABS find & invite================ */}
        <View style={tw` pb-1 rounded-b-2xl`}>
        <View style={tw`flex-row justify-between mx-7 pt-10 pb-1`}>
          <TouchableOpacity  onPress={() => {
              handlePress('Find');
              setTab('Find');
              setfindFocused(false);
              setInviteFocused(false);
              setConstactsData([]);
              setSearchResults([]);
            }}>
            <Text style={tw`text-white text-lg`}>Find Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
              handlePress('Invite');
              setTab('Invite');
              setfindFocused(false);
              setInviteFocused(false);
              setConstactsData([]);
              setSearchResults([]);
            }}>
            <Text style={tw`text-white text-lg`}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`pb-5`}>
          <Animated.View style={[tw`bg-white w-26 h-1 rounded-full`, animatedStyles]} />
        </View>
        </View>
        

{/* =============ALL SEARCH============== */}
        <View style={tw`mx-5 rounded-full  flex-row justify-end bg-white/20`}>

  {/* =======magnifying glass button==== */}
          <View style={[tw`rounded-full m-1 `,]} >
            <Ionicons style={tw`p-2`} name="search-outline" size={31} color="white" />
          </View>
{/* ============TEXT INPUT============ */}
          {
            tab == 'Find' ? (
              <TextInput
                ref={findUsersInputRef}
                onChangeText={(value) => {
                  debounceSearchForUsers(value);
                  setFindTextInput(value);
                }}
                placeholder='Search for friends'
                placeholderTextColor={'white'}
                style={tw`flex-1 text-base pl-1 text-white`}
                enterKeyHint='search'
                returnKeyType='search'
                onFocus={() => setfindFocused(true)}
                onBlur={() => setfindFocused(false)}
              />
            ):null
          }
          {
            tab == 'Invite' ? (
              <TextInput
                ref={inviteContactsRef}
                onChangeText={debounceContactsSearch}
                placeholder='Search contacts'
                placeholderTextColor={'white'}
                style={tw`flex-1 text-base pl-1 text-white`}
                enterKeyHint='search'
                returnKeyType='search'
                onFocus={() => setInviteFocused(true)}
                onBlur={() => setInviteFocused(false)}
              />
            ):null
          }
          {/* X's to clear search */}
          {
            findFocused ? (
              <TouchableOpacity
                style={[tw`rounded-full m-1 `, ]}
                onPress={() => {
                  setSearchResults([]);
                  findUsersInputRef.current.clear();
                  findUsersInputRef.current.blur();
                }}
              >
                <Ionicons style={tw`p-2`} name="close-outline" size={31} color="white" />
              </TouchableOpacity>
            ):null
          }
          {
            inviteFocused ? (
              <TouchableOpacity
                style={[tw`rounded-full m-1 `, ]}
                onPress={() => {
                setConstactsData([]);
                inviteContactsRef.current.clear();
                inviteContactsRef.current.blur();
              }}
            >
              <Ionicons style={tw`p-2`} name="close-outline" size={31} color="white" />
            </TouchableOpacity>
            ):null
          }

{/* ================FIND USERS SEARCH RESULTS===================== */}
          {
            searchResults.length > 0 && tab == 'Find' ? (
              <View 
                style={[tw`absolute w-full bg-black top-16 rounded-3xl z-30 overflow-hidden`, 
                {height: searchResults.length * 66 > 594 ? 594 : searchResults.length * 66 } ]}>
                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={tw`z-30`}>
                {
                  searchResults.map((user, index) => {
                    let showBorder = index + 1 != searchResults.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-600/50`: ``;
                    return (
                      <View
                        key={index}
                        style={tw.style(['flex-row', 'items-center', 'p-3', 'border-0', 'px-4', 'mb-1', 'justify-between'], borderClass)}
                      >
                        <TouchableOpacity 
                          style={tw`flex-row items-center `}
                          onPress={() => {
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                        >
                          {
                            user.lottie? (
                              <View style={tw`h-10 w-10 rounded-full mr-2`}>
                                <LottieView
                                  source={animations[user.lottie]}
                                  style={tw`h-full w-full `}
                                  autoPlay
                                  loop={false}
                                  speed={1}
                                />
                              </View>
                            ):(
                              <Image 
                                source={{ uri: user.pic }} 
                                style={tw`h-10 w-10 rounded-full mr-2`}
                              />
                            )
                          }
                          <Text 
                            numberOfLines={1} ellipsizeMode='tail' 
                            style={tw`text-slate-50 text-lg w-45`}>{user.username}</Text>
                        </TouchableOpacity>
                    {/* =======FRIEND BUTTON======= */}
                        {/* <TouchableOpacity 
                          style={tw.style('p-3', 'px-5', 'rounded-3xl', 'self-end', 'bg-blue-600', {'bg-slate-600': addedUsers[user.id]}, )}
                          onPress={() => {
                            setAddedUsers(prev => ({ ...prev, [user.id]: !prev[user.id] }));
                            handleAddedFriend(user.id);
                          }}
                        >
                          <Text style={tw.style('text-white', )}>{addedUsers[user.id]? 'Undo' : 'Add Friend'}</Text>                         
                        </TouchableOpacity> */}

                  {/* new button renders */}
                        {
                          user.action == 'Remove'? (
                            <TouchableOpacity 
                              style={tw`rounded-full bg-gray-800 p-2 px-4`}
                              onPress={() => {
                                //setSelectedUser(user);
                                //setRemoveModalOpen(true);
                                Alert.alert('Alert', `Are you sure you want to remove ${user.username} as your friend?`,
                                  [ { text: 'yes', onPress: () => removefn.mutate(user.id) }, { text: 'no, cancel', } ],
                                  { cancelable: true },
                                )
                              }}
                            >
                              <Text style={tw`text-white font-bold`}>Remove</Text>
                            </TouchableOpacity>
                          ):
                          user.action == 'Sent'? (
                            <TouchableOpacity 
                              style={tw`rounded-full bg-gray-800 p-2 px-4`}
                              onPress={() => unsendFRfn.mutate(user.id) }
                            >
                              <Text style={tw`text-white font-bold`}>Sent</Text>
                            </TouchableOpacity>
                          ):(
                            <TouchableOpacity 
                              style={tw`rounded-full bg-blue-600 p-2 px-4`}
                              onPress={() => sendFRfn.mutate(user.id) }
                            >
                              <Text style={tw`text-white font-bold`}>Add Friend</Text>
                            </TouchableOpacity>
                          )
                        }
                      </View>
                    )
                  }
                  )
                }
                </ScrollView>
              </View>
            ):null
          }

{/* ================CONTACTS INVITE SEARCH RESULTS===================== */}
          {
            contactsData.length > 0 && tab == 'Invite' ? (
              <View 
                style={[tw`absolute w-full bg-black top-16 rounded-3xl z-30 overflow-hidden`, 
                { height: contactsData.length * 66 > 594 ? 594 : contactsData.length * 66 } ]}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={tw`z-30`}>
                {
                  contactsData.map((contact, index) => {
                    let showBorder = index + 1 != contactsData.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-600/50`: ``;
                    let mobileNumber = 'No mobile number';
                    if (Array.isArray(contact.phoneNumbers)) {
                      const mobilePhoneNumberObject = contact.phoneNumbers.find(phone => phone.label === "mobile");
                      mobileNumber = mobilePhoneNumberObject ? mobilePhoneNumberObject.number : 'No mobile number'
                      console.log(mobileNumber, '======================================')
                    }

                    return (
                      <View
                        key={index}
                        style={tw.style(['flex-row', 'items-center', 'p-3', 'border-0', 'px-4', 'mb-1', 'justify-between'], borderClass)}
                      >
                        <View style={tw`flex-row items-center `}>
                          {
                            contact.imageAvailable? (
                              <Image 
                              source={{ uri: contact.image.uri }} 
                              style={tw`h-10 w-10 rounded-full mr-3`}
                            />
                            ):(
                              <View style={tw`w-10 h-10 bg-white/20 mr-3 rounded-full justify-center items-center`}>
                                <Text style={tw`text-white  text-lg text-center `}>
                                    {contact.name[0]} 
                                </Text>
                              </View>
                            )
                          }

                            <Text style={tw`text-slate-50 text-lg w-35`} numberOfLines={1} ellipsizeMode='tail'>
                              {contact.name}
                            </Text>
                        </View>
{/* ================INVITE SMS BUTTON================ */}
                        <TouchableOpacity 
                          style={tw.style('p-3', 'px-5', 'rounded-3xl', 'self-end', 'bg-blue-600', 'flex-row', 'items-center', 
                                {'bg-slate-600': addedInvites[contact.id]}, )}
                          onPress={() => {
                            setAddedInvites(prev => ({ ...prev, [contact.id]: !prev[contact.id] }));
                            handleInviteFriendSMS(mobileNumber);
                          }}
                        >
                          <Text style={tw`mr-2 text-white font-bold`}>
                            {addedInvites[contact.id]? 'Sent' : 'Send link'}
                          </Text>
                          <Feather name="send" size={14} color="white" />                         
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  )
                }
                </ScrollView>
              </View>
            ):null
          }
        </View>

        <View style={tw`absolute bottom-0 right-5`}>
          <TouchableOpacity style={tw`flex-col items-end`} onPress={() => navigation.navigate('Home')} >
            <Text style={tw`text-lg text-white text-center`}>Done</Text>
            <Ionicons name='arrow-forward-outline' color='white' />
          </TouchableOpacity>
        </View>



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
          <View style={tw`bg-gray-900 rounded-xl mx-5 pt-3`}>
            <View style={tw`flex-col justify-center `}>

          {/*================ top part=============== */}
              <View style={tw`px-5 flex-col items-center`}>

          {/* ===========PICTURE ROW========= */}
                <View style={tw`flex-row items-center justify-around  mt-1`}>
                  {
                    selectedUser.lottie? (
                      <View style={tw`h-36 w-36 rounded-full mx-4`}>
                        <LottieView 
                            source={animations[selectedUser.lottie]} 
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
                <View style={tw`flex-row justify-between items-center mt-3 z-50 `}>
                  <TouchableOpacity 
                    style={tw``}
                    //onPress={() => removefn.mutate(selectedUser.id)}
                  >
                    <Text style={tw`text-white text-base`}>Remove Friend</Text>
                  </TouchableOpacity>
                  <Pressable
                    style={tw`bg-blue-600 p-2 px-6 rounded-md z-50`}
                    //onPress={() => setRemoveModalOpen(false)}
                  >
                    <Text style={tw`text-white text-base`}>Cancel</Text>
                  </Pressable>
                </View>
              </View>  
              
            </View>
          </View>
        </Modal>

        <PopUp
          popUpOpen={popUpOpen} 
          setPopUpOpen={setPopUpOpen} 
          title={popTitle}
          message={popMsg}
          OKmsg={popOkMsg}
          NOmsg={popNoMsg}
          OKfn={() => setPopUpOpen(false)}
          NOfn={popNoFn}
        />

      </SafeAreaView>

    </View>
    </GestureHandlerRootView>
  )
}