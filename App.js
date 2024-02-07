import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Leaderboard } from './screens/LeaderBoard';

export default function App() {
  return (
    <View styles={styles.text}>

      <Leaderboard></Leaderboard>

    </View>
  );
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   status: {
    marginTop: StatusBar.currentHeight
   },
   text: {
    color: 'white'
   }
 });
