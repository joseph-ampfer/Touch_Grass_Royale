import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { storage } from '../Storage';
import { getUserLevel, levels } from '../levelingUp/levelConstants';
import tw from 'twrnc';

export default function ProgressBar({ totalPoints, userLevel, levelsData }) {
  const [level, setLevel] = useState(null);
  const [startPoints, setStartPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressWidth = useSharedValue(0);




  useEffect(() => {
    const animateProgress = async () => {
      const id = storage.getNumber('my_id')
      const keyLevel = "level" + id;
      const keyProgress = "progress" + id;
  

      const jsonLevel = storage.getString(keyLevel) || null;
      const savedLevel = JSON.parse(jsonLevel) || null;
      const savedProgress = storage.getNumber(keyProgress) || null;

      let startLevel = levelsData[0];
      let startProg = 0;
      
      if (savedLevel && savedProgress) {
        startLevel = savedLevel;
        startProg = savedProgress;
      }

      setLevel(startLevel);
      setStartPoints(startProg);
      progressWidth.value = startProg / startLevel.to_next_level;

      // Animate to the end of the current level if necessary
      if (totalPoints >= startLevel.to_next_level + startLevel.cumulative) {
        progressWidth.value = withTiming(1, {
          duration: 2000, // Duration proportional to the points left to cover in the level
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }, () => {
          // After completing the level, handle level trasition
          runOnJS(handleLevelTransition)(startLevel, totalPoints) ;
        });

      } else {
        // Simple case: animate within the same level
        const newProgress = (totalPoints - startLevel.cumulative) / startLevel.to_next_level;
        progressWidth.value = withTiming(newProgress, {
          duration: (totalPoints - startProg) * 2,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        });
      }

      // Save the latest level and progress
      //const { currentLevel, progress } = getUserLevel(totalPoints);
      const current = levelsData[userLevel - 1];
      const prog = totalPoints - current['cumulative'];
      setProgress(prog);
      storage.set(keyLevel, JSON.stringify(current));
      storage.set(keyProgress, prog);
    };

    animateProgress();
  }, [totalPoints]);




  const handleLevelTransition = (currentLevel, totalPoints) => {
    if (currentLevel.level >= levelsData.length) return; // No more levelsData
    const nextLevel = levelsData.find(l => l.level === currentLevel.level + 1);
    if (!nextLevel) return;

    // Check if total points exceed the current level's maximum
    if (totalPoints >= nextLevel.cumulative) {
      // Animate to the end of the current level
      progressWidth.value = withTiming(1, {
        duration: (currentLevel.to_next_level - (totalPoints - currentLevel.cumulative)) * 2,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      }, () => {

        // Start from 0 in the next level
        runOnJS(setLevel)(nextLevel);
        progressWidth.value = 0;  // Reset progress for the new level
        let newProgress = ((totalPoints - nextLevel.cumulative) / nextLevel.to_next_level);
        if (newProgress > 1) {
          newProgress = 1;
        }
        progressWidth.value = withTiming(newProgress, {
          duration: 2000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }, () => {

          // Recursively handle the next transition
          if (totalPoints >= nextLevel.to_next_level + nextLevel.cumulative) {
            runOnJS(handleLevelTransition)(nextLevel, totalPoints);
          }
        });
      });
    }
  };


  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${100 * progressWidth.value}%`,
    };
  });




  return (
    <View style={tw`flex-col justify-center items-center  bg-white/10 p-2 rounded-2xl h-full`}>

      <View style={tw`flex-col justify-center items-center mb-2`}>
        <Text style={tw`text-white text-2xl  mb-2  `}>{level?.name}</Text>
        {level?.image? (
          <Image style={tw`h-25 w-25`} source={{uri: level?.image}} />
        ):null}
      </View>
    
      {/* PROGRESS BAR */}
    
      <View style={tw`w-full h-10 border-2 border-white/20 rounded-lg  mt-0`}>
        <Animated.View style={[tw` rounded-md h-full`, animatedStyle]} >
          <View style={tw`w-full h-full bg-white/20 rounded-md -z-50`} />
        </Animated.View>
        {/* <View 
          style={[tw`bg-zinc-700 rounded-md h-full w-[${ (progress / currentLevel?.to_next_level) * 100 }%]`]}
        >
          <Image blurRadius={20} source={require('../assets/images/progressBar.png')} style={tw`w-full h-full rounded-md -z-50`} />
        </View> */}
      </View>
      <Text style={tw`text-white text-base  text-center`}>{progress?.toLocaleString()}/{level?.to_next_level?.toLocaleString()} pts</Text>       
    </View>
  )


}