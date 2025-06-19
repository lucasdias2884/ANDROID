import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Text, Card } from 'react-native-paper';
import { listarBebidas } from '../database/bebidas'; // ✅ Atualizado para Realm

export default function RelatorioScreen() {
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const dados = listarBebidas(); // ✅ Realm retorna diretamente
      setBebidas(Array.isArray(dados) ? dados : []);
    } catch (err) {
      console.error('❌ Erro ao carregar bebidas:', err);
      Alert.alert('❌ Erro', 'Não foi possível carregar os dados do estoque.');
    } finally {
      setLoading(false);
    }
  }, []);

  const formatarValor = (valor) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);

  const renderItem = ({ item }) => {
    const valorTotal = item.quantidade * item.preco;
    return (
      <Card style={{ marginBottom: 10, padding: 12 }} mode="outlined">
        <Text
          variant="titleMedium"
          style={{ marginBottom: 5, fontWeight: 'bold' }}
        >
          {item.nome}
        </Text>
        <Text>Quantidade: {item.quantidade}</Text>
        <Text>Preço Unitário: {formatarValor(item.preco)}</Text>
        <Text style={{ fontWeight: 'bold' }}>
          Valor Total: {formatarValor(valorTotal)}
        </Text>
      </Card>
    );
  };

  const calcularTotalGeral = () =>
    bebidas.reduce((acc, item) => acc + item.quantidade * item.preco, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: 'center',
            marginBottom: 20,
            fontWeight: 'bold',
          }}
        >
          Relatório de Estoque
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 50 }} />
        ) : bebidas.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            📭 Nenhuma bebida cadastrada no estoque.
          </Text>
        ) : (
          <FlatList
            data={bebidas}
            keyExtractor={(item) => item._id.toString()} // ✅ Realm usa _id
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Card style={{ marginTop: 20, padding: 15 }} mode="outlined">
                <Text
                  variant="titleMedium"
                  style={{ marginBottom: 5, fontWeight: 'bold' }}
                >
                  📊 Total Geral em Estoque
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {formatarValor(calcularTotalGeral())}
                </Text>
              </Card>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
