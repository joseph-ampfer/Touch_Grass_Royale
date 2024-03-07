import { View, Text, TextInput, Image, } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import { useIsFocused } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import debounce from '../debounce/debounce';
import { ScrollView, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import RequestCard from '../components/RequestCard';


//INSTALLED BUT NOT USED 
//expo notifications
//expo linking
//expo local authentication
//expo intent launcher
//expo haptics
//backgroundfetch



const TAB_WIDTH = 150;

export default function SearchScreen({ navigation }) {
  const [showSearch, toggleSearch] = useState(false);
  const [addedUsers, setAddedUsers] = useState({});
  const [addedInvites, setAddedInvites] = useState({});
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
  const friendRequests = [
    {
      name: 'John Doe1',
      time: '500',
      pic: 'https://i.pravatar.cc/600/'
    },
    {
      name: 'Jampfer',
      time: '400',
      pic: 'https://i.pravatar.cc/60'
    },
    {
      name: 'Test test 3',
      time: '399',
      pic: 'https://i.pravatar.cc/60/68'
    },
    {
      name: 'Test test 4',
      time: '399',
      pic: 'https://i.pravatar.cc/60/63'
    },
    {
      name: 'Test test 5',
      time: '300',
      pic: 'https://i.pravatar.cc/60/64'
    },
    {
      name: 'Test test 6',
      time: '250',
      pic: 'https://i.pravatar.cc/60/65'
    },
    {
      name: 'Test test 1',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/66'
    },
    {
      name: 'Test test 2',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/67'
    },
    {
      name: 'Test test 3',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/69'
    },
    {
      name: 'Test test 4',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/70'
    },
    {
      name: 'Test test 5',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/80'
    },
    {
      name: 'Test test 6',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/90'
    },
    {
      name: 'Test test 1',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/10'
    },
    {
      name: 'Test test 2',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/20'
    },
    {
      name: 'Test test 3',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/30'
    },
    {
      name: 'Test test 4',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/40'
    },
    {
      name: 'Test test 5',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60'
    },
    {
      name: 'Test test 6',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60'
    },
]
  const [contactsData, setConstactsData] = useState([])
  const [tab, setTab] = useState('Find');

//CLEANUP
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
        toggleSearch(false);
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

  // SLIDER
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
//////



const handleInviteSearch = async value => {
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

const handleInvSearchDebounce = debounce(handleInviteSearch, 500)


  return (
    <GestureHandlerRootView style={tw`flex-1`}>
    <View style={tw`flex-1 bg-gray-900`}>
      <StatusBar style='light'/>
      <Image blurRadius={10} source={require('../assets/images/full.png')} style={tw`absolute w-full h-full -z-50`} />
      <SafeAreaView style={tw`flex-1`}>
{/* ================TOP TABS================ */}
        <View style={tw` pb-1 rounded-b-2xl`}>
        <View style={tw`flex-row justify-between mx-7 pt-10 pb-1`}>
          <TouchableOpacity  onPress={() => {
              handlePress('Find');
              setTab('Find');
            }}>
            <Text style={tw`text-white text-lg`}>Find Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
              handlePress('Invite');
              setTab('Invite');
            }}>
            <Text style={tw`text-white text-lg`}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`pb-5`}>
          <Animated.View style={[tw`bg-white w-26 h-1 rounded-full`, animatedStyles]} />
        </View>
        </View>
        

{/* =============FIND FRIENDS SEARCH INPUT============== */}
        <View style={[tw`bg-slate-200 mx-5 rounded-full  flex-row justify-end`, {backgroundColor: showSearch? 'rgba(255,255,255,0.2)': 'transparent'}]}>

          {
            tab == 'Find' && showSearch? (
              <TextInput
                placeholder='Search for friends'
                placeholderTextColor={'white'}
                style={tw`flex-1 text-base pl-6 text-white`}
              />
            ):null
          }
          {
            tab == 'Invite' && showSearch? (
              <TextInput
              onChangeText={handleInvSearchDebounce}
              placeholder='Invite to play'
              placeholderTextColor={'white'}
              style={tw`flex-1 text-base pl-6 text-white`}
            />
            ):null
          }
{/* ===============MAGNIFYING GLASS BUTTON============= */}
          <TouchableOpacity 
            style={[tw`rounded-full m-1`, {backgroundColor: showSearch? 'transparent': 'rgba(0,0,0,0.1)'}]}
            onPress={() => toggleSearch(!showSearch)}
            touchSoundDisabled={true}
          >
            <Ionicons style={tw`p-2`} name="search-outline" size={31} color="white" />
          </TouchableOpacity>
{/* ================ADD SEARCH RESULTS===================== */}
          {
            users.length > 0 && tab == 'Find' && showSearch? (
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

{/* ================INVITE SEARCH RESULTS===================== */}
          {
            contactsData.length > 0 && tab == 'Invite' && showSearch? (
              <View style={tw`absolute w-full bg-gray-100 top-16 rounded-3xl`}>
                {
                  contactsData.map((contact, index) => {
                    let showBorder = index + 1 != contactsData.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-400`: ``;
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
                              <View style={tw`w-10 h-10 bg-slate-600 mr-3 rounded-full justify-center items-center`}>
                                <Text style={[tw`text-white font-bold text-lg text-center ml-1`, ]}>{ contact.name[0]} </Text>
                              </View>
                            )
                          }

                            <Text style={tw`text-black text-lg w-35`} numberOfLines={1} ellipsizeMode='tail' >{contact.name}</Text>
                        </View>
{/* ================INVITE SMS BUTTON================ */}
                        <TouchableOpacity 
                          style={tw.style('p-3', 'px-5', 'rounded-3xl', 'self-end', 'bg-blue-600', 'flex-row', 'items-center', {'bg-slate-600': addedInvites[contact.id]}, )}
                          onPress={() => {
                            setAddedInvites(prev => ({ ...prev, [contact.id]: !prev[contact.id] }));
                            handleInviteFriendSMS(mobileNumber);
                          }}
                        >
                          <Text style={tw.style('text-white', 'mr-2' )}>{addedInvites[contact.id]? 'Send again' : 'Send link'}</Text>
                          <Feather name="send" size={14} color="white" />                         
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

{/* ===============FRIEND REQUESTS=================== */}
        <View style={tw` -z-20 `}>
          <Text style={tw`text-gray-100 text-lg font-semibold ml-5 mb-3 mt-5`}>Friend requests</Text>
          <View style={tw``}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                friendRequests.map((user, index) => {
                  return (
                    // friend component
                    <RequestCard key={index} user={user} />
                  )
                })
              }
            </ScrollView>
          </View>
        </View>

      </SafeAreaView>
{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar/>
    </View>
    </GestureHandlerRootView>
  )
}