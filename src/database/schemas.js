export const UsuarioSchema = {
  name: 'Usuario',
  properties: {
    _id: 'int',
    nome: 'string',
    senha: 'string',
  },
  primaryKey: '_id',
};

export const BebidaSchema = {
  name: 'Bebida',
  properties: {
    _id: 'int',
    nome: 'string',
    quantidade: 'int',
    preco: 'double',
  },
  primaryKey: '_id',
};
