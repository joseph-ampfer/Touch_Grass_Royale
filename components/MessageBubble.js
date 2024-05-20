import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedReaction,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 



const MessageBubble = ({ message, isSelected, onPress }) => {
    const scale = useSharedValue(0); // Initial scale for the checkmark
    const opacity = useSharedValue(isSelected ? 1 : 0); // Set initial opacity based on isSelected
  
    

    const handlePress = () => {
        onPress(); // This function is called on the JavaScript thread
    };
    
      // Define the tap gesture using runOnJS to ensure handlePress runs on the JavaScript thread
      const tapGesture = Gesture.Tap().onEnd(() => {
        runOnJS(handlePress)();
      });

    // Update checkmark appearance based on isSelected prop
    useAnimatedReaction(
      () => isSelected,
      (current, previous) => {
        if (current !== previous) {
          scale.value = withSpring(current ? 1 : 0);
          opacity.value = withTiming(current ? 1 : 0, { duration: 500 });
        }
      },
      [isSelected]
    );

  
    // Animated style for the checkmark
    const checkmarkStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={tw`flex-1 mx-5`}>
          <GestureDetector gesture={tapGesture}>
            <Animated.View style={tw`bg-blue-600 rounded-3xl py-3 px-4 my-2 relative`}>

              <Text style={tw`text-center text-white`}>{message}</Text>

              <Animated.View
                style={[
                  { position: 'absolute', bottom: -10, right: -10,  }, // Position the checkmark outside the bubble
                  checkmarkStyle, // Apply the animated style
                ]}
              >
                <Ionicons style={tw`text-white`} name="checkmark-circle" size={24} />
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  export default MessageBubble;
  