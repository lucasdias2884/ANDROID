import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { inserirBebida } from '../database/db';

export default function CadastroBebidaScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const limparCampos = () => {
    setNome('');
    setQuantidade('');
    setPreco('');
  };

  const salvarBebida = () => {
    if (!nome.trim() || !quantidade.trim() || !preco.trim()) {
      Alert.alert('⚠️ Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    const qtd = parseInt(quantidade, 10);
    const valor = parseFloat(preco.replace(',', '.'));

    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('⚠️ Quantidade inválida', 'Informe uma quantidade maior que zero.');
      return;
    }

    if (isNaN(valor) || valor <= 0) {
      Alert.alert('⚠️ Preço inválido', 'Informe um preço maior que zero.');
      return;
    }

    inserirBebida(
      nome.trim(),
      qtd,
      valor,
      () => {
        try {
          Alert.alert(
            '✅ Bebida cadastrada!',
            `Nome: ${nome}\nQuantidade: ${qtd}\nPreço: R$ ${valor.toFixed(2)}`
          );
          limparCampos();
          setTimeout(() => navigation.goBack(), 1500); // Retorno automático após cadastro
        } catch (e) {
          console.error('Erro ao exibir mensagem de sucesso:', e);
        }
      },
      (err) => {
        console.error('❌ Erro ao inserir bebida:', err);
        Alert.alert(
          '❌ Erro',
          err.code === 'SQLITE_CONSTRAINT'
            ? 'Erro: Nome da bebida já cadastrado.'
            : 'Não foi possível salvar a bebida no banco de dados.'
        );
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
              Cadastro de Bebida
            </Text>

            <TextInput
              label="Nome da Bebida"
              value={nome}
              onChangeText={setNome}
              mode="outlined"
              style={{ marginBottom: 15 }}
            />
            <TextInput
              label="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              mode="outlined"
              style={{ marginBottom: 15 }}
            />
            <TextInput
              label="Preço (R$)"
              value={preco}
              onChangeText={setPreco}
              keyboardType="decimal-pad"
              mode="outlined"
              style={{ marginBottom: 25 }}
            />

            <Button mode="contained" onPress={salvarBebida}>
              Salvar Bebida
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
