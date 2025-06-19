import realm from './realm';

// ✅ Cadastra novo usuário após verificar duplicidade
export function cadastrarUsuario(nome, senha) {
  try {
    const usuarioExistente = realm
      .objects('Usuario')
      .filtered('nome == $0', nome)[0];

    if (usuarioExistente) {
      throw new Error('Nome de usuário já cadastrado.');
    }

    const id = Date.now(); // ID único baseado em timestamp
    realm.write(() => {
      realm.create('Usuario', { _id: id, nome, senha });
    });
  } catch (error) {
    console.error('❌ Erro ao cadastrar usuário:', error);
    throw error;
  }
}

// ✅ Valida usuário e senha no banco
export function validarUsuario(nome, senha) {
  try {
    const usuario = realm
      .objects('Usuario')
      .filtered('nome == $0 AND senha == $1', nome, senha)[0];

    return usuario !== undefined;
  } catch (error) {
    console.error('❌ Erro ao validar login:', error);
    throw error;
  }
}
