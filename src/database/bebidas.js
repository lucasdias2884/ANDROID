import realm from './realm';

// ✅ Insere uma nova bebida no banco
export function inserirBebida(nome, quantidade, preco) {
  try {
    const id = Date.now(); // ID único baseado em timestamp
    realm.write(() => {
      realm.create('Bebida', { _id: id, nome, quantidade, preco });
    });
  } catch (error) {
    console.error('❌ Erro ao inserir bebida:', error);
    throw error;
  }
}

// ✅ Retorna todas as bebidas como array padrão
export function listarBebidas() {
  try {
    const dados = realm.objects('Bebida').sorted('nome');
    return Array.from(dados);
  } catch (error) {
    console.error('❌ Erro ao listar bebidas:', error);
    throw error;
  }
}

// ✅ Atualiza a quantidade de uma bebida por ID
export function atualizarEstoque(id, novaQuantidade) {
  try {
    realm.write(() => {
      const bebida = realm.objectForPrimaryKey('Bebida', id);
      if (bebida) {
        bebida.quantidade = novaQuantidade;
      }
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar estoque:', error);
    throw error;
  }
}

// ✅ Busca uma bebida pelo nome
export function buscarBebidaPorNome(nome) {
  try {
    const bebida = realm.objects('Bebida').filtered('nome == $0', nome)[0];
    return bebida || null;
  } catch (error) {
    console.error('❌ Erro ao buscar bebida:', error);
    throw error;
  }
}
