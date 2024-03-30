import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import tw from 'twrnc';


const MagicalLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <Portal>
      <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}
        style={tw`flex-1 flex-col justify-center items-center bg-black/40`}>
        <ActivityIndicator size={50} color="#FFFFFF" />
      </Animated.View>
    </Portal>
  );
};

export default MagicalLoader;
