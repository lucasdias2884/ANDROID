import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button, TextInput, Text, Snackbar } from 'react-native-paper';
import { validarUsuario } from '../database/usuarios'; // ✅ Atualizado para Realm

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = () => {
    if (!usuario.trim() || !senha.trim()) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    setCarregando(true);

    try {
      const valido = validarUsuario(usuario.trim(), senha.trim());
      setCarregando(false);

      if (valido) {
        navigation.replace('Home');
      } else {
        setErro('Usuário ou senha inválidos!');
      }
    } catch (err) {
      console.error('Erro ao validar usuário:', err);
      setCarregando(false);
      setErro('Erro ao verificar login!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
                marginBottom: 30,
                fontWeight: 'bold',
              }}
            >
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

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={carregando}
              disabled={carregando}
              style={{ marginBottom: 10 }}
            >
              Entrar
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('CadastroUsuario')}
            >
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
