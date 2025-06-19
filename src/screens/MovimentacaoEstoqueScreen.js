import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import { buscarBebidaPorNome, atualizarEstoque } from '../database/bebidas';

export default function MovimentacaoEstoqueScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('entrada');

  const movimentarEstoque = () => {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('⚠️ Erro', 'Preencha todos os campos!');
      return;
    }

    const qtd = parseInt(quantidade, 10);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('⚠️ Quantidade inválida', 'Informe um valor numérico maior que zero.');
      return;
    }

    try {
      const bebida = buscarBebidaPorNome(nome.trim());

      if (!bebida) {
        Alert.alert(
          '❌ Bebida não encontrada!',
          `Nenhuma bebida com o nome "${nome}" foi localizada.`
        );
        return;
      }

      const novaQtd = tipo === 'entrada' ? bebida.quantidade + qtd : bebida.quantidade - qtd;

      if (novaQtd < 0) {
        Alert.alert(
          '❌ Estoque insuficiente!',
          `Você só tem ${bebida.quantidade} unidades em estoque.`
        );
        return;
      }

      atualizarEstoque(bebida._id, novaQtd); // ✅ Realm usa _id

      setNome('');
      setQuantidade('');
      setTipo('entrada');

      Alert.alert(
        '✅ Estoque atualizado!',
        `Bebida: ${bebida.nome}\nTipo: ${tipo.toUpperCase()}\nAlteração: ${tipo === 'entrada' ? '+' : '-'}${qtd}\nNovo total: ${novaQtd}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (erro) {
      console.error('❌ Erro ao movimentar estoque:', erro);
      Alert.alert('❌ Erro', 'Erro ao acessar o banco de dados.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
              <Text
                variant="headlineMedium"
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  fontWeight: 'bold',
                }}
              >
                Movimentar Estoque
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

              <Text style={{ marginBottom: 5 }}>Tipo de Movimentação</Text>
              <RadioButton.Group onValueChange={setTipo} value={tipo}>
                <RadioButton.Item label="Entrada" value="entrada" />
                <RadioButton.Item label="Saída" value="saida" />
              </RadioButton.Group>

              <Button mode="contained" onPress={movimentarEstoque}>
                Aplicar Movimentação
              </Button>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
