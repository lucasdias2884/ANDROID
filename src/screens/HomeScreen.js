import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            variant="headlineMedium"
            style={{
              marginBottom: 30,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Painel de Controle
          </Text>

          <View style={{ width: '100%', gap: 15 }}>
            <Button
              mode="contained"
              icon="plus"
              onPress={() => navigation.navigate('CadastroBebida')}
            >
              Cadastro de Bebidas
            </Button>

            <Button
              mode="contained"
              icon="warehouse"
              onPress={() => navigation.navigate('MovimentacaoEstoque')}
            >
              Movimentar Estoque
            </Button>

            <Button
              mode="contained"
              icon="chart-bar"
              onPress={() => navigation.navigate('Relatorio')}
            >
              Relatórios
            </Button>

            <Button
              mode="outlined"
              icon="logout"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              }
              style={{ marginTop: 20 }}
            >
              Sair
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
