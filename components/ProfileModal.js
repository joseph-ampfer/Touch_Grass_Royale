import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import { Portal } from 'react-native-portalize';
import { useNavigation } from '@react-navigation/native';
import { getUserLevel, levels } from '../levelingUp/levelConstants';

export default function ProfileModal({ modalOpen, setModalOpen, selectedUser}) {
  const navigation = useNavigation();

  //const { currentLevel } = getUserLevel(selectedUser?.total_points)

  return (
    <Portal>
    <Modal 
      statusBarTranslucent={true}
      backdropOpacity={0.5}
      animationIn='zoomIn' 
      animationInTiming={300}
      animationOut='zoomOut'
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      isVisible={modalOpen}
      onBackButtonPress={() => setModalOpen(false)}
      onBackdropPress={() => setModalOpen(false)}
      onSwipeComplete={() => setModalOpen(false)}
      swipeThreshold={10}
      swipeDirection={['down', 'left', 'right', 'up']}
      useNativeDriverForBackdrop={true}
      style={tw`justify-center items-center m-auto  `}
    >
      <View style={tw`bg-black rounded-xl  pt-3`}>
        <View style={tw`flex-col justify-center `}>
  
      {/*================ top part=============== */}
          <View style={tw`px-5`}>
  
      {/* ===========PICTURE ROW========= */}
            <View style={tw`flex-row items-center justify-around  mt-1`}>
              <TouchableOpacity 
                style={tw`flex-col items-center justify-center w-16 `}
                onPress={() => {
                  navigation.push('Friends', { userID: selectedUser.id, isCurrentUser: false, username: selectedUser.username });
                  setModalOpen(false);

                }}
              >
                <Text style={tw`text-white font-bold text-xl`}>{selectedUser?.friends_count?.toLocaleString()}</Text>
                <Text style={tw`text-neutral-200 font-semibold`}>Friends</Text>
              </TouchableOpacity>
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
              <View style={tw`flex-col items-center justify-center w-16`}>
                <Text style={tw`text-white font-bold text-xl`}>{selectedUser?.gems?.toLocaleString()}</Text>
                <Text style={tw`text-neutral-200 font-semibold`}>Gems</Text>
              </View>
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
                    style={tw`text-neutral-400 text-base text-center`}>{selectedUser.full_name}</Text>
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
          <View style={tw`bg-gray-900 rounded-t-3xl pt-5 pb-3 mt-2 rounded-b-xl`}>
  
      {/* =============TROPHIES============== */}
            <View style={tw`flex-row justify-evenly mx-5`}>
              <View style={tw`flex-col items-center`}>
                <Image style={tw`h-10 w-10 `} source={require('../assets/images/first.png')} />
                <Text style={tw`text-white text-lg font-bold`}>{selectedUser.first}</Text>
              </View>
              <View style={tw`flex-col items-center`}>
                <Image style={tw`h-10 w-10 `} source={require('../assets/images/second.png')} />
                <Text style={tw`text-white text-lg font-bold`}>{selectedUser.second}</Text>
              </View>
              <View style={tw`flex-col items-center`}>
                <Image style={tw`h-10 w-10 `} source={require('../assets/images/third.png')} />
                <Text style={tw`text-white text-lg font-bold`}>{selectedUser.third}</Text>
              </View>
            </View>
  
      {/* =============CURRENT RANK============= */}
            <View style={tw`flex-col justify-center items-center mt-4`}>
              <Image style={tw`h-30 w-30`} source={{ uri: selectedUser.level_image }} />
              <Text style={tw`text-neutral-200 font-semibold text-base `}>{selectedUser.level_name}</Text>
            </View>
  
            {/* <View style={tw`mx-5 h-6 border-2 border-slate-200 rounded-lg mt-3`}>
              <View style={[tw`bg-zinc-700 rounded-md h-full   w-[${
                                (4123 / 5000) * 100
                            }%]`]}>
                <Image blurRadius={20} source={require('../assets/images/progressBar.png')} style={tw`w-full h-full rounded-md -z-50`} />
              </View>
              <Text style={tw`text-white text-base text-center`}>4123/5000</Text>
            </View> */}
  
      {/* =============TOTAL POINTS============= */}
            <View style={tw`flex-row justify-center items-center mt-5`}>
             <Text style={tw`text-gray-100 text-2xl font-bold `}>Total: </Text>
             <Text style={tw`text-white text-2xl  font-bold`}> {selectedUser?.total_points?.toLocaleString() ?? '0'} pts </Text>
            </View>
  
          </View>  
  
        </View>
      </View>
    </Modal>
    </Portal>
  )
}