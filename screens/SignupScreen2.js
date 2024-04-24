import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeInDown, FadeInRight, SlideInRight, ZoomInRight } from "react-native-reanimated";

const screenDimensions = Dimensions.get("screen");

export default function SignupScreen2({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex-1`}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/full.png")}
        style={[
          tw`w-full h-full absolute`,
          { height: screenDimensions.height },
        ]}
      />
      {/* birds */}
      <View style={tw`w-full h-full absolute`}>
        <Image
          entering={FadeInUp.delay(200).duration(1000)}
          style={[tw`h-full w-full`, {height: screenDimensions.height}]}
          source={require("../assets/images/birds.png")}
        />
      </View>

      <View>
        <View style={tw`flex-col justify-center h-full  `}>
          <View
            style={[
              tw`flex-row justify-center items-center mb-10`,
              { marginTop: -1.5 * insets.top },
            ]}
          >
            <Text style={tw`text-white text-5xl font-bold`}>Sign Up</Text>
          </View>

          <View style={tw`flex-col mx-5 `}>
            <View style={tw`p-4 rounded-full bg-black/5 mt-3`}>
              <TextInput 
                placeholder="Email" 
                placeholderTextColor="gray"
                inputMode="email"
                autoComplete="email"
                style={tw`ml-3  text-base`} 
              />
            </View>

            <View style={tw`p-4 rounded-full bg-black/5 mt-3`}>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="gray"
                style={tw`ml-3  text-base`} 
              />
            </View>

            <View style={tw`p-4 rounded-full bg-black/5 mt-3`}>
              <TextInput 
                placeholder="Name (optional)" 
                placeholderTextColor="gray"
                style={tw`ml-3  text-base`} 
              />
            </View>

            <View style={tw`p-4 rounded-full bg-black/5 mt-3`}>
              <TextInput 
                placeholder="Password"
                placeholderTextColor="gray" 
                secureTextEntry
                autoComplete="current-password"
                style={tw`ml-3  text-base`} 
              />
            </View>

            <View style={tw`p-4 rounded-full bg-black/5 mt-3`}>
              <TextInput 
                placeholder="Confirm password"
                placeholderTextColor="gray" 
                secureTextEntry
                autoComplete="current-password"
                style={tw`ml-3  text-base`} 
              />
            </View>

            <TouchableOpacity
              style={tw`flex-row justify-center items-center rounded-full bg-blue-500 p-4 mt-3`}
            >
              <Text style={tw`text-white`}>Sign Up</Text>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-3`}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login2')}>
                <Text style={tw`text-blue-600`}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`flex-row justify-center w-full bg-white z-20`}>
          {/* Touch Grass Royale*/}
          <Animated.Image
            entering={FadeInDown.delay(100).duration(600).springify().stiffness(300).damping(100)}
            source={require("../assets/images/Touch Grass (1).png")}
            style={[
              tw`h-15   pt-2  z-50 absolute bottom-0 w-full opacity-50`, {opacity: 0.5}
            ]}
          />
        </View>

      </View>
    </View>
  );
}
