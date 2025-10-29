import express from 'express';
import { createTable } from './controller/Produtos.js';
import * as VendasController from './controller/Vendas.js';
import router from './routes.js';

const app = express();
app.use(express.json());

try {
  await createTable();
  await VendasController.createTableVendas();
  console.log("Banco de dados inicializado com sucesso");
} catch (error) {
  console.error("Erro ao inicializar o banco:", error);
  process.exit(1);
}

app.use(router);

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ msg: "Erro interno do servidor" });
});

app.listen(3000, () => console.log("✅ API rodando na porta 3000"));
