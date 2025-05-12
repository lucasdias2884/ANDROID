import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Text, Card } from 'react-native-paper';
import { listarBebidas } from '../database/db';

export default function RelatorioScreen() {
  const [bebidas, setBebidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      listarBebidas(
        (bebidasDB) => {
          setBebidas(Array.isArray(bebidasDB) ? bebidasDB : []);
          setLoading(false);
        },
        (erro) => {
          console.error('Erro ao carregar bebidas:', erro);
          Alert.alert('❌ Erro', 'Não foi possível carregar os dados do estoque.');
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Erro inesperado:', error);
      Alert.alert('❌ Erro', 'Falha ao acessar o banco de dados.');
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const valorTotal = item.quantidade * item.preco;
    return (
      <Card style={{ marginBottom: 10, padding: 12 }} mode="outlined">
        <Text variant="titleMedium" style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.nome}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
        <Text>Preço Unitário: R$ {item.preco.toFixed(2)}</Text>
        <Text style={{ fontWeight: 'bold' }}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>
      </Card>
    );
  };

  const calcularTotalGeral = () => {
    return bebidas.reduce((acc, item) => acc + (item.quantidade * item.preco), 0).toFixed(2);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Card style={{ marginTop: 20, padding: 15 }} mode="outlined">
                <Text variant="titleMedium" style={{ marginBottom: 5, fontWeight: 'bold' }}>📊 Total Geral em Estoque</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  R$ {calcularTotalGeral()}
                </Text>
              </Card>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
