

// Fibonacci leveling

export const levels = [
    { level_id: 1, level_name: "Noob", points_next_level: 1440, cum_to_get_here: 0, image: require('../assets/images/noob1.png') },
    { level_id: 2, level_name: "Understudy", points_next_level: 2880, cum_to_get_here: 1440, image: require('../assets/images/understudy.png') },
    { level_id: 3, level_name: "Apprentice", points_next_level: 4320, cum_to_get_here: 4320, image: require('../assets/images/apprentice.png') },
    { level_id: 4, level_name: "Minimalist", points_next_level: 7200, cum_to_get_here: 8640, image: require('../assets/images/minimalist.png') },
    { level_id: 5, level_name: "Guru", points_next_level: 11520, cum_to_get_here: 15840, image: require('../assets/images/guru.png') },
    { level_id: 6, level_name: "Sage", points_next_level: 18720, cum_to_get_here: 27360, image: require('../assets/images/sage.png') },
    { level_id: 7, level_name: "Oracle", points_next_level: 30240, cum_to_get_here: 46080, image: require('../assets/images/oracle.png') },
    { level_id: 8, level_name: "Enlightened", points_next_level: 48960, cum_to_get_here: 76320, image: require('../assets/images/enlightened.png') },
    { level_id: 9, level_name: "Ascended", points_next_level: 79200, cum_to_get_here: 125280, image: require('../assets/images/ascended1.png') },
    { level_id: 10, level_name: "Almighty", points_next_level: 128160, cum_to_get_here: 204480, image: require('../assets/images/almighty.png') },
]


export const getUserLevel = (totalPoints) => {
    let currentLevel = levels[0];
    for (let i = 0; i < levels.length; i++) {
        if (totalPoints >= levels[i].cum_to_get_here) {
            currentLevel = levels[i];
        } else {
            break;
        }
    }
    const progress = totalPoints - currentLevel.cum_to_get_here;
    return {currentLevel, progress} ;
};