import {View, Text, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { useMutation } from "@tanstack/react-query";
import { loginFetch } from "../apiFetches/fetches";
import { storage } from "../Storage";

const screenDimensions = Dimensions.get("screen");

export default function LoginScreen2({ navigation }) {

  const loginFn = useMutation({
    mutationFn: (creds) => loginFetch(creds),
    onSuccess: (result) => {
      storage.set('access_token', result.access_token);
      storage.set('my_id', result.user_id);
      setEmail('');
      setPassword('');
      navigation.push('Home');
    },
    onError: (error) => {
      console.error(error.detail);
    }
  })

  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <Text style={tw`text-white text-5xl font-bold`}>Login</Text>
          </View>

          <View style={tw`flex-col mx-5 `}>
            <View style={tw`p-4 rounded-full bg-black/5 mb-3`}>
              <TextInput 
                placeholder="Email" 
                placeholderTextColor="gray"
                inputMode="email"
                autoComplete="email"
                style={tw`ml-3  text-base`} 
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={tw`p-4 rounded-full bg-black/5 mb-5`}>
              <TextInput 
                placeholder="Password"
                placeholderTextColor="gray" 
                secureTextEntry
                autoComplete="current-password"
                style={tw`ml-3 text-base `} 
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            {
              loginFn.isPending? (
                <View style={tw`flex-row justify-center items-center rounded-full  p-4 mb-5`}>
                  <ActivityIndicator />
                </View>
              ):(
                <TouchableOpacity
                  style={tw`flex-row justify-center items-center rounded-full bg-blue-500 p-4 mb-5`}
                  onPress={() => {
                    loginFn.mutate({ email: email.toLowerCase(), password: password })
                  }}
                >
                  <Text style={tw`text-white`}>Login</Text>
                </TouchableOpacity>
              )
            }

            <View style={tw`flex-row justify-center `}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp2')}>
                <Text style={tw`text-blue-600`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`flex-row justify-center w-full `}>
          {/* Touch Grass Royale*/}
          <Animated.Image
            entering={FadeInDown.delay(100).duration(600).springify().stiffness(300).damping(100)}
            source={require("../assets/images/Touch Grass (1).png")}
            style={[
              tw`h-15   pt-2 z-50 absolute bottom-0 w-full opacity-50`,
            ]}
          />
        </View>

      </View>
    </View>
  );
}
