import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StackNavigator from './src/navigation/StackNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Se você estiver usando fontes personalizadas:
        await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
          Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
        });

        console.log('✅ Fontes carregadas');
      } catch (e) {
        console.error('❌ Erro ao carregar o app:', e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
