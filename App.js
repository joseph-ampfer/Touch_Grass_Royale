import 'expo-dev-client';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation/appNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
      <GestureHandlerRootView style={{ flex:1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
  );
}


