import Realm from 'realm';
import { UsuarioSchema, BebidaSchema } from './schemas';

// ✅ Inicializa e exporta a instância do banco Realm
const realm = new Realm({
  schema: [UsuarioSchema, BebidaSchema],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: false, // evitar perder dados em migração
  schemaValidation: true,              // ativa verificação do schema
});

export default realm;
