import React from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import tw from 'twrnc';


const MagicalError = ({ error }) => {
  

  if (error) {
    return (
        <Portal>
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}
            style={tw`flex-1 flex-col justify-center items-center bg-black/40`}>
            <ScrollView>
            <Text style={tw`text-white text-lg`}>{JSON.stringify(error.response, null, 2)}</Text>
            </ScrollView>
          </Animated.View>
        </Portal>
      );
  }
};

export default MagicalError;