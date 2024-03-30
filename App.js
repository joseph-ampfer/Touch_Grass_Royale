import 'expo-dev-client';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation/appNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView style={{ flex:1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}


