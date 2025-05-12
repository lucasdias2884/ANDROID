import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import StackNavigator from './src/navigation/StackNavigator';
import { initDB } from './src/database/db';

// Impede a splash de desaparecer antes do app estar pronto
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Carregar fontes e inicializar banco de dados simultaneamente
        await Promise.all([
          initDB(),
          Font.loadAsync({
            Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
            Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
          }),
        ]);

        console.log('✅ Fontes e banco de dados carregados');
      } catch (e) {
        console.error('❌ Erro ao carregar app:', e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      // Exibir um componente de carregamento ao invés de `null`
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
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
