import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroUsuarioScreen from '../screens/CadastroUsuarioScreen';
import HomeScreen from '../screens/HomeScreen';
import CadastroBebidaScreen from '../screens/CadastroBebidaScreen';
import MovimentacaoEstoqueScreen from '../screens/MovimentacaoEstoqueScreen';
import RelatorioScreen from '../screens/RelatorioScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuarioScreen}
        options={{ title: 'Cadastro de Usuário' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início', headerBackVisible: false }}
      />
      <Stack.Screen
        name="CadastroBebida"
        component={CadastroBebidaScreen}
        options={{ title: 'Cadastro de Bebidas' }}
      />
      <Stack.Screen
        name="MovimentacaoEstoque"
        component={MovimentacaoEstoqueScreen}
        options={{ title: 'Movimentação de Estoque' }}
      />
      <Stack.Screen
        name="Relatorio"
        component={RelatorioScreen}
        options={{ title: 'Relatórios' }}
      />
    </Stack.Navigator>
  );
}
