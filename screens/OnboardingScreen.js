import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Onboarding from "react-native-onboarding-swiper";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Login3");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <Onboarding
        onDone={handleDone}
        //onSkip={handleDone}
        showSkip={false}
        bottomBarHighlight={false}
        // DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15, flex: 1 }}
        subTitleStyles={tw`mx-5`}
        titleStyles={tw``}
        imageContainerStyles={{ paddingBottom: 10 }}
        pages={[
          {
            backgroundColor: "#d1f9ff",
            image: (
              <View
                style={[
                  tw`flex-col justify-center items-center`,
                  { width: width * 0.9, height: width },
                ]}
              >
                {/* <Image style={tw`h-50 w-50`} source={require('../assets/touchgrass (3).png')} /> */}
                {/* <LottieView
                  source={require("../assets/animations/touchgrass (3).json")}
                  style={{ width: "80%", height: "80%" }}
                  autoPlay
                  loop
                /> */}
                <Animated.Image entering={FadeInUp.springify().damping(10).mass(5).stiffness(10).overshootClamping(false).restDisplacementThreshold(0.1).restSpeedThreshold(5)}
                    source={require('../assets/touchgrass (3).png')}
                    style={tw`h-80 w-80`}
                />        
                <Image
                  source={require("../assets/images/logo-plain-script-black.png")}
                  style={[tw`w-70 h-15`]}
                />
              </View>
            ),
            title: (
              <View style={tw`mx-3`}>
                {/* <Text style={tw`font-bold text-5xl mb-5 text-black`}>Welcome to Touch Grass Royale!</Text> */}
              </View>
            ),
            subtitle:
              "Join the challenge, reduce screen time, and compete with friends.",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/zenWork.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>The Game of Less</Text>
            ),
            subtitle:
              "The less you scroll, the more you score. Transform productivity into play and watch the points pile up.",
          },
          //   {
          //     backgroundColor: "#fef3c7",
          //     image: (
          //       <View style={styles.lottie}>
          //         <LottieView
          //           source={require("../assets/animations/zenWork.json")}
          //           style={{ width: "100%", height: "100%" }}
          //           autoPlay
          //           loop
          //         />
          //       </View>
          //     ),
          //     title: (
          //       <Text style={tw`font-bold text-5xl mb-5`}>Finish in the top 3 to earn gems.</Text>
          //     ),
          //     subtitle:
          //     <View style={tw`flex-col mx-5`}>
          //       <Text style={tw`text-center mt-2`}>Tip: The more friends you have, the bigger the prize!</Text>
          //       <Text style={tw`text-center mt-2`}>5 friends, 1st place wins 30 gems. </Text>
          //       <Text style={tw`text-center mt-2`}>20 friends, 1st place wins 120 gems. </Text>
          //     </View>
          //       ,
          //   },
          {
            backgroundColor: "#94f29c",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/friends.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>
                Compete With Friends
              </Text>
            ),
            subtitle:
              "Dare to put your phone down and climb the leaderboard among your friends. Who will be crowned the days winner?",
          },
          {
            backgroundColor: "#fafca4",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/fun.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>
                More Friends, Bigger Prize
              </Text>
            ),
            subtitle:
              "Finish in 1st, 2nd, or 3rd to earn gems. The more friends you have, the bigger the reward.",
            //"Invite your squad and earn bonus points. The more, the merrier, the less phone-tethered.",
          },
          {
            backgroundColor: "#f5c2fc",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/trophy.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>Reap the Rewards</Text>
            ),
            subtitle:
              //"More friends = bigger prize. Earn gems by finishing in the top 3 and use gems to unlock avatars you can show off."
              "Use gems to unlock exclusive avatars you can show off to your pals. Daily winners bask in glory and gems!",
            //"Customize your avatar with your hard-earned gems. Daily winners bask in glory and gems!",
          },
          {
            backgroundColor: "#95d8e6",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/podium.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>
                Where Do You Stand?
              </Text>
            ),
            subtitle:
              "Check the leaderboards to see who's winning. Touch Grass Royale doesn't count as screen time 😇.",
          },
          {
            backgroundColor: "#72e3fc",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/arcade.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>Tips & Tricks</Text>
            ),
            subtitle: (
              <View style={tw`mx-5`}>
                <View style={`flex-row`}>
                  <Text style={tw` text-base font-bold`}>• Gems on Win: </Text>
                  <Text style={tw`mb-1 ml-3 text-base`}>
                    You will only get your gems from winning by checking the app
                    during the next competition day.
                  </Text>
                </View>
                <View style={`flex-row`}>
                  <Text style={tw` text-base font-bold`}>
                    • Point Updates:{" "}
                  </Text>
                  <Text style={tw`mb-1 ml-3 text-base `}>
                    The app will try to update your points in the background, but
                    opening the app will ensure they’re up-to-date.
                  </Text>
                </View>
                <View style={`flex-row`}>
                  <Text style={tw` text-base font-bold`}>• End Time:</Text>
                  <Text style={tw`mb-1 ml-3 text-base`}>
                    Competitions end simultaneously worldwide. Be sure to check
                    in!
                  </Text>
                </View>
              </View>
            ),
            //"They will be broadcast to all friends as the one who needs to 'touch grass' and be branded 'The Phubber' 🤮.",
          },
          //   {
          //     backgroundColor: "#cff5ff",
          //     image: (
          //       <View style={styles.lottie}>
          //         <LottieView
          //           source={require("../assets/animations/winner (2).json")}
          //           style={{ width: "100%", height: "100%" }}
          //           autoPlay
          //           loop
          //         />
          //       </View>
          //     ),
          //     title: (
          //       <Text style={tw`font-bold text-5xl mb-5`}>
          //         Compete, Earn, Boast
          //       </Text>
          //     ),
          //     subtitle:
          //       "Climb to the top, then rub it in. The only app where less screen time means more bragging rights.",
          //   },
          {
            backgroundColor: "#a8fca7",
            image: (
              <View style={[tw`flex-row justify-center`, styles.lottie]}>
                <Image
                  source={require("../assets/images/screenshot.png")}
                  style={tw`h-100 w-50`}
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5`}>One last thing</Text>
            ),
            subtitle:
              "To calculate your screen time and convert it to points, enable usage access. Your settings will open automatically upon signing up or logging in.",
          },
          {
            backgroundColor: "#a78bfa",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../assets/animations/letsGo.json")}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <Text style={tw`font-bold text-5xl mb-5 text-white`}>
                Are You Ready?
              </Text>
            ),
            subtitle:
              "Perhaps you might benefit from a tactile reunion with natures carpet? Jump in and find out.",
          },
        ]}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 15,
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
});
