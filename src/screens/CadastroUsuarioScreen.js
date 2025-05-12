import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { cadastrarUsuario } from '../database/db';

export default function CadastroUsuarioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'erro' ou 'sucesso'

  const limparCampos = () => {
    setNome('');
    setSenha('');
  };

  const handleCadastro = () => {
    if (!nome.trim() || !senha.trim()) {
      setMensagem('Preencha todos os campos.');
      setTipoMensagem('erro');
      return;
    }

    if (senha.trim().length < 4) {
      setMensagem('A senha deve ter ao menos 4 caracteres.');
      setTipoMensagem('erro');
      return;
    }

    cadastrarUsuario(
      nome.trim(),
      senha.trim(),
      () => {
        setMensagem('Usuário cadastrado com sucesso!');
        setTipoMensagem('sucesso');
        limparCampos();
        setTimeout(() => navigation.replace('Login'), 1500); // Melhorado para `replace`
      },
      (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        setMensagem(
          err.code === 'SQLITE_CONSTRAINT'
            ? 'Erro: nome de usuário já está em uso.'
            : 'Erro ao cadastrar usuário.'
        );
        setTipoMensagem('erro');
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
            Cadastro de Usuário
          </Text>

          <TextInput
            label="Usuário"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            autoCapitalize="none"
            style={{ marginBottom: 15 }}
          />
          <TextInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            mode="outlined"
            style={{ marginBottom: 25 }}
          />
          <Button mode="contained" onPress={handleCadastro}>
            Cadastrar
          </Button>

          <Snackbar
            visible={!!mensagem}
            onDismiss={() => setMensagem('')}
            duration={3000}
            style={{
              backgroundColor: tipoMensagem === 'erro' ? '#d32f2f' : '#388e3c',
            }}
            action={{
              label: 'OK',
              onPress: () => setMensagem(''),
            }}
          >
            {mensagem}
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
