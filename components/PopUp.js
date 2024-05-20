import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import { Portal } from 'react-native-portalize';

const screenDimensions = Dimensions.get('screen');

export default function PopUp({ popUpOpen, setPopUpOpen, title, message, OKmsg, NOmsg, OKfn, NOfn }) {

  return (
    <Portal>
      <Modal 
        statusBarTranslucent={true}
        backdropOpacity={0.5}
        animationIn='zoomIn' 
        animationInTiming={250}
        animationOut='zoomOut'
        animationOutTiming={200}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={200}
        isVisible={popUpOpen}
        onBackButtonPress={() => setPopUpOpen(false)}
        useNativeDriverForBackdrop={true}
        coverScreen={true}
        deviceHeight={screenDimensions.height}
        style={[tw`justify-center items-center m-auto `, {height: screenDimensions.height}]}
      >
        <View style={tw`bg-neutral-800 rounded-xl    w-2/3`}>
          <View style={tw`flex-col  p-7`}>

            <View style={tw`flex-row justify-center mb-3 `}>
              <Text style={tw`text-white font-bold text-lg text-center`}>{title}</Text>
            </View>
            <View style={tw` `}>
              <Text style={tw`text-neutral-400 text-center`}>{message}</Text>
            </View>

          </View>

            {/* buttons */}
            <View style={tw`flex-col `}>
              <TouchableOpacity 
                style={tw`flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`} 
                onPress={OKfn}
              >
                <Text style={tw`text-blue-500 font-bold text-base`}>{OKmsg}</Text>
              </TouchableOpacity>
              
              {
                NOmsg? (
                  <TouchableOpacity 
                    style={tw`flex-row justify-center items-center p-3 border-t-2 border-neutral-700/10`} 
                    onPress={NOfn}
                  >
                    <Text style={tw`text-white text-base`}>{NOmsg}</Text>
                  </TouchableOpacity>
                ):null
              }

            </View>
  
    

        </View>
      </Modal>
    </Portal>
  )
}