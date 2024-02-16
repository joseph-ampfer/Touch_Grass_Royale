import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import tw from 'twrnc';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={tw`bg-white h-full w-full`}>
        <StatusBar style='light' />
        {/* background */}
        <Image blurRadius={70} style={tw`h-full w-full absolute`} source={require('../assets/images/noBlur.png')} />

        {/* birds */}
        <View style={tw`w-full h-full absolute`}>
          <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={tw`h-full w-full`} source={require('../assets/images/birds.png')} />
        </View>

        {/* title and form */}
        <View style={tw`h-full w-full flex justify-around pt-30 pb-10`}>
          {/* title */}
          <View style={tw`flex`}>
            <Animated.Text entering={FadeInUp.duration(1000).springify()} style={tw`text-white text-center font-bold tracking-wider text-5xl mb-35`}>
              Login
            </Animated.Text>

            {/* form */}
            <View style={tw`flex items-center mx-4 mt-10`}>
              <Animated.View entering={FadeInDown.duration(1000).springify()} style={tw`bg-black/5 p-4 rounded-2xl w-full mb-3`}>
                <TextInput placeholder='Email' placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={tw`bg-black/5 p-4 rounded-2xl w-full mb-4`}>
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
              </Animated.View>
              {/* submit */}
              <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={tw`w-full`}>
                <TouchableOpacity
                  style={tw`w-full bg-sky-400 p-4 rounded-2xl mb-5`}>
                    <Text style={tw`text-white text-center font-bold`}>Login</Text>
                  </TouchableOpacity>   
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={tw`flex-row justify-center`}>
                <Text >Don't have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('SignUp')}>
                  <Text style={tw`text-sky-600`}>SignUp</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
    </View>
  );
}