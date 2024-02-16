import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
        <AppNavigation />
    </SafeAreaProvider>
  );
}


