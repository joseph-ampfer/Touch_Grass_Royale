

// Fibonacci leveling

//export const levels = [
//    { level: 1, name: "Noob", to_next_level: 1440, cumulative: 0, image: require('../assets/images/noob1.png') },
//    { level: 2, name: "Understudy", to_next_level: 2880, cumulative: 1440, image: require('../assets/images/understudy.png') },
//    { level: 3, name: "Apprentice", to_next_level: 4320, cumulative: 4320, image: require('../assets/images/apprentice.png') },
//    { level: 4, name: "Minimalist", to_next_level: 7200, cumulative: 8640, image: require('../assets/images/minimalist.png') },
//    { level: 5, name: "Guru", to_next_level: 11520, cumulative: 15840, image: require('../assets/images/guru.png') },
//    { level: 6, name: "Sage", to_next_level: 18720, cumulative: 27360, image: require('../assets/images/sage.png') },
//    { level: 7, name: "Oracle", to_next_level: 30240, cumulative: 46080, image: require('../assets/images/oracle.png') },
//    { level: 8, name: "Enlightened", to_next_level: 48960, cumulative: 76320, image: require('../assets/images/enlightened.png') },
//    { level: 9, name: "Ascended", to_next_level: 79200, cumulative: 125280, image: require('../assets/images/ascended1.png') },
//    { level: 10, name: "Almighty", to_next_level: 128160, cumulative: 204480, image: require('../assets/images/almighty.png') },
//]
//
//
//export const getUserLevel = (totalPoints) => {
//    let currentLevel = levels[0];
//    for (let i = 0; i < levels.length; i++) {
//        if (totalPoints >= levels[i].cumulative) {
//            currentLevel = levels[i];
//        } else {
//            break;
//        }
//    }
//    const progress = totalPoints - currentLevel.cumulative;
//    return {currentLevel, progress} ;
//};