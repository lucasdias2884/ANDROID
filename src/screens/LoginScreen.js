import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, TextInput, Text, Snackbar } from 'react-native-paper';
import { validarUsuario } from '../database/db';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (!usuario.trim() || !senha.trim()) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    validarUsuario(
      usuario.trim(),
      senha.trim(),
      (usuarioEncontrado) => {
        if (usuarioEncontrado) {
          navigation.replace('Home');
        } else {
          setErro('Usuário ou senha inválidos!');
        }
      },
      (err) => {
        console.error('Erro ao validar usuário:', err);
        setErro('Erro ao verificar login!');
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 30, fontWeight: 'bold' }}>
              Login
            </Text>

            <TextInput
              label="Usuário"
              value={usuario}
              onChangeText={setUsuario}
              mode="outlined"
              autoCapitalize="none"
              autoComplete="username"
              style={{ marginBottom: 15 }}
            />

            <TextInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              mode="outlined"
              secureTextEntry
              autoComplete="password"
              style={{ marginBottom: 25 }}
            />

            <Button mode="contained" onPress={handleLogin} style={{ marginBottom: 10 }}>
              Entrar
            </Button>

            <Button mode="outlined" onPress={() => navigation.navigate('CadastroUsuario')}>
              Criar nova conta
            </Button>

            <Snackbar
              visible={!!erro}
              onDismiss={() => setErro('')}
              duration={3000}
              style={{ backgroundColor: '#d32f2f' }}
              action={{
                label: 'OK',
                onPress: () => setErro(''),
              }}
            >
              {erro}
            </Snackbar>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
