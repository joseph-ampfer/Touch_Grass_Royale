import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView,  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const animations = [
    { name: 'pikachu', require: require('../assets/animations/pikachu.json'), price: 1000 },
    { name: 'toaster', require: require('../assets/animations/toaster.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/zenWork.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/animeGirl.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/animeGuy.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/catBox.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/catCool.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/catSleep.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/catWitch.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/dogFloat.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/dogWalk.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/dogWalk2.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/eyeBlob.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/ghibliGirl.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/girlCatEars.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/gojoCat.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationCoffee.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationCow.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationGirl.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationGuy.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationMan2.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationSloth.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/meditationTurtle.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/noFace.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/nyanCat.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/panda.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/ramen.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/robot.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/robotGamer.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/spaceInvader.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/spaceJam.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/spaceWork.json'), price: 300 },
    { name: 'pikachu', require: require('../assets/animations/studying.json'), price: 300 },
  ];

export default function LottieAvatarShop() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  
  playFireworks = () => {
    this.fireworks.play();
  }

  return (
    <View>
      <ScrollView  >
        {
          animations.map((animation, index) => (
            <View key={index} style={tw`flex-col items-center mb-10 mt-1 relative   py-5 rounded-3xl `}>
              <View style={[tw`h-56 w-56  rounded-lg bg-gray-800  shadow-white  shadow-xl`, ]}>
                <LottieView 
                    source={animation.require} 
                    style={{width:'100%', height:'100%'}}
                    autoPlay 
                    loop 
                    speed={1}
                />
              </View>
              <TouchableOpacity onPress={() => {
                  setSelectedAnimation(animation);
                  setModalOpen(true);
                }} 
                style={[tw`bg-blue-600 rounded-full px-2 absolute bottom-1 right-14 elevation-10 `, ]}>
                <View style={tw`flex-row justify-center items-center `}>
                  <Text style={tw`text-white text-center mx-1 text-lg`}>{animation.price}</Text>
                  <FontAwesome5 name="gem" size={17} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>

{/* =========PURCHASE MODAL========= */}
      <Modal 
        animationIn='slideInUp' 
        animationInTiming={300}
        animationOut='slideOutDown'
        animationOutTiming={300}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={modalOpen}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        onSwipeComplete={() => setModalOpen(false)}
        swipeThreshold={1}
        swipeDirection={['down', 'left', 'right']}
        useNativeDriverForBackdrop={true}
        style={tw`justify-center m-auto `}
      >
        <View style={tw`bg-gray-700 rounded-lg p-7 `}>
          <View style={tw`flex-col items-center justify-center `}>
            {/* LOTTIE */}
            <View style={[tw`h-66 w-66  rounded-lg`, ]}>
              <LottieView 
                  source={selectedAnimation.require} 
                  style={{width:'100%', height:'100%'}}
                  autoPlay 
                  loop 
                  speed={1}
              />
            </View>
            {/* QUESTION */}
            <View style={tw`my-3`}>
              <Text style={tw`text-lg text-slate-50`}>Unlock for {selectedAnimation.price} gems?</Text>
            </View>
            {/* UNLOCK OR CANCEL BUTTONS */}
            <View style={tw`flex-row justify-center mt-1 `}>
              <TouchableOpacity 
                style={tw`p-3 px-6 bg-blue-600 rounded-full mx-2`}
                onPress={() => {
                  setModalOpen(false);
                  setShowFireworks(true);
                }} 
              >
                <Text style={tw`text-slate-50 text-center  font-bold my-auto`}>Unlock</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`p-3 px-6 bg-gray-600 rounded-full mx-2`}
                onPress={() => setModalOpen(false)} 
              >
                  <Text style={tw`text-slate-50 text-center font-bold my-auto `}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

{/* =========FIREWORKS=========== */}
      {
        showFireworks && (
          <View style={tw`absolute h-full w-full  `}>
          <LottieView 
            ref={animation => {
              this.fireworks = animation;
            }}
            source={require('../assets/animations/fireworks.json')}
            style={{width:'100%', height:'100%'}}
            loop={false}
            autoPlay
            onAnimationFinish={() => setShowFireworks(false)}
          />
        </View>
      )
    }



    </View>
  )
}