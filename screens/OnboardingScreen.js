import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Onboarding from 'react-native-onboarding-swiper';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();

    const handleDone = () =>{
        navigation.navigate('Leaderboard');
    }

    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        // DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal:15, flex: 1, }}
        subTitleStyles={tw`mx-5`}
        titleStyles={tw``}
        imageContainerStyles={{paddingBottom: 10}}
        pages={[
            {
                backgroundColor: '#fef3c7',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/zenWork.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>   
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>The Game of Less</Text>,
                subtitle: 'The less you scroll, the more you score. Transform productivity into play and watch the points pile up.',
            },
            {
                backgroundColor: '#94f29c',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/friends.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>    
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>Compete With Friends</Text>,
                subtitle: 'Dare to put your phone down and climb the leaderboard among your friends. Who will be crowned the winner?',
            },
            {
                backgroundColor: '#f5c2fc',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/trophy.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>Reap the Rewards</Text>,
                subtitle: 'Customize your avatar with your hard-earned points. Daily winners bask in glory and gems!',
            },
            {
                backgroundColor: '#95d8e6',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/podium.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>Where Do You Stand?</Text>,
                subtitle: "Check the leaderboards to see who's winning. TGR time doesn't count as screen time 😇.",
            },
            {
                backgroundColor: '#fafca4',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/fun.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>More Friends, More Fun</Text>,
                subtitle: "Invite your squad and earn bonus points. The more, the merrier, the less phone-tethered.",
            },
            {
                backgroundColor: '#c4c2c0',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/loser.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>Don't Be The Loser</Text>,
                subtitle: "They will be broadcast to all friends as the one who needs to 'touch grass' and be branded 'The Phubber' 🤮.",
            },
            {
                backgroundColor: '#cff5ff',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/winner (2).json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5`}>Compete, Earn, Boast</Text>,
                subtitle: "Climb to the top, then rub it in. The only app where less screen time means more bragging rights.",
            }, 
            {
                backgroundColor: '#a78bfa',
                image: (
                    <View style={styles.lottie}>
                        <LottieView 
                            source={require('../assets/animations/letsGo.json')} 
                            style={{width:'100%', height:'100%'}}
                            autoPlay 
                            loop 
                        />
                    </View>  
                ),
                title: <Text style={tw`font-bold text-5xl mb-5 text-white`}>Are You Ready?</Text>,
                subtitle: "Perhaps you might benefit from a tactile reunion with natures carpet? Jump in and find out.",
            },
        ]}
        />
    <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
    lottie: {
        width: width*0.9,
        height: width,
    },
    doneButton: {
        padding: 15,
        backgroundColor: 'white',
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50
    }
})
