import { View, Text, TextInput, Image, } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import { useIsFocused } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown } from 'react-native-reanimated';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import debounce from '../debounce/debounce';
import { ScrollView, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import RequestCard from '../components/RequestCard';
import LottieView from 'lottie-react-native';
import { Portal } from 'react-native-portalize';
import ProfileModal from '../components/ProfileModal';
import animations from '../animations/animations';


//INSTALLED BUT NOT USED 
//expo notifications
//expo linking
//expo local authentication
//expo intent launcher
//expo haptics
//backgroundfetch
//expo image picker
//npm i @expo/metro-config



const TAB_WIDTH = 150;

export default function SearchScreen({ navigation }) {
  const [showSearch, toggleSearch] = useState(false);
  const [addedUsers, setAddedUsers] = useState({});
  const [addedInvites, setAddedInvites] = useState({});
  const [users, setUsers] = useState([
    {
      name: 'JohnDoe',
      time: '524',
      pic: 'https://i.pravatar.cc/600/',
      lottie: 'spaceJam'
    },
    {
      name: 'Hexscuseme',
      time: '500',
      pic: 'https://i.pravatar.cc/60',
      lottie: 'gojoCat'
    },
    {
      name: 'Nephlauxic',
      time: '499',
      pic: 'https://i.pravatar.cc/60/68',
      lottie: null
    },
]);
  const friendRequests = [
    {
      name: 'JohnDoe',
      time: '524',
      pic: 'https://i.pravatar.cc/600/',
      lottie: 'spaceJam'
    },
    {
      name: 'Hexscuseme',
      time: '500',
      pic: 'https://i.pravatar.cc/60',
      lottie: 'gojoCat'
    },
    {
      name: 'Nephlauxic',
      time: '499',
      pic: 'https://i.pravatar.cc/60/68',
      lottie: null
    },
    {
      name: 'Hobbes',
      time: '461',
      pic: 'https://i.pravatar.cc/60/63',
      lottie: 'spaceInvader'
    },
    {
      name: 'eener_weiner',
      time: '444',
      pic: 'https://i.pravatar.cc/60/64',
      lottie: null
    },
    {
      name: 'Test 6',
      time: '443',
      pic: 'https://i.pravatar.cc/60/65',
      lottie: 'ghibliGirl'
    },
    {
      name: 'jampfer',
      time: '411',
      pic: 'https://i.pravatar.cc/60/66',
      lottie: 'eyeBlob'
    },
    {
      name: 'Dennis',
      time: '400',
      pic: 'https://i.pravatar.cc/60/67',
      lottie: 'ramen'
    },
    {
      name: 'frobro',
      time: '399',
      pic: 'https://i.pravatar.cc/60/69',
      lottie: 'meditationCow'
    },
    {
      name: 'Test test 4',
      time: '350',
      pic: 'https://i.pravatar.cc/60/70',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 5',
      time: '300',
      pic: 'https://i.pravatar.cc/60/80',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 6',
      time: '100',
      pic: 'https://i.pravatar.cc/60/90',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 1',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/10',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 2',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/20',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 3',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/30',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 4',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/40',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 5',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60',
      lottie: 'ghibliGirl'
    },
    {
      name: 'Test test 6',
      time: '9.2',
      pic: 'https://i.pravatar.cc/60/60',
      lottie: 'ghibliGirl'
    },
  ]
  const [contactsData, setConstactsData] = useState([])
  const [tab, setTab] = useState('Find');
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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
      <Image blurRadius={10} fadeDuration={100} source={require('../assets/images/full.png')} style={tw`absolute w-full h-full -z-50`} />
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
        

{/* =============ALL SEARCH============== */}
        <View style={[tw`bg-slate-200 mx-5 rounded-full  flex-row justify-end`, {backgroundColor: showSearch? 'rgba(255,255,255,0.2)': 'transparent'}]}>

{/* ============TEXT INPUT============ */}
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
              placeholder='Search contacts'
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
{/* ================FIND FRIENDS SEARCH RESULTS===================== */}
          {
            users.length > 0 && tab == 'Find' && showSearch? (
              <View style={tw`absolute w-full bg-gray-800 top-16 rounded-3xl`}>
                {
                  users.map((user, index) => {
                    let showBorder = index + 1 != users.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-600`: ``;
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
                          <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-slate-50 text-lg w-45`}>{user.name}</Text>
                        </TouchableOpacity>
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

{/* ================INVITE FRIENDS SEARCH RESULTS===================== */}
          {
            contactsData.length > 0 && tab == 'Invite' && showSearch? (
              <View style={tw`absolute w-full bg-gray-800 top-16 rounded-3xl`}>
                {
                  contactsData.map((contact, index) => {
                    let showBorder = index + 1 != contactsData.length;
                    let borderClass = showBorder? `border-b-2 border-b-gray-600`: ``;
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

                            <Text style={tw`text-slate-50 text-lg w-35`} numberOfLines={1} ellipsizeMode='tail' >{contact.name}</Text>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              {
                friendRequests.map((user, index) => {
                  return (
                    // friend component
                    <Animated.View key={index} entering={FadeInDown.delay(index * 100).duration(1000).springify()} >
                        <RequestCard user={user} onPicturePress={() => {
                          setSelectedUser(user);
                          setModalOpen(true);
                        }} />
                    </Animated.View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>

{/* ================PROFILE MODAL================ */}
        <ProfileModal
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          selectedUser={selectedUser}
        />

      </SafeAreaView>
{/* =============BOTTOM NAV-BAR============== */}
      <BottomNavBar/>

    </View>
    </GestureHandlerRootView>
  )
}