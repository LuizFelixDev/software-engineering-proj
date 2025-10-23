import express from 'express'
import { createTable, insertProduto, updateProduto, selectProdutos, selectProduto, deleteProduto } from './controller/Produtos.js';

const app = express();
app.use(express.json());

await createTable();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/produtos', async function(req, res) {
  let produtos = await selectProdutos();
  res.json(produtos);
});

app.get('/produto', async function(req, res) {
  let produto = await selectProduto(req.body.id);
  res.json(produto);
});

app.post("/produto", function(req, res) {
  insertProduto(req.body);
  res.json({
    "statusCode": "200"
  });
});

app.put("/produto", function(req, res) {
  if (req.body && !req.body.id) {
    res.json({
      "statusCode": "400",
      "msg": "Você precisa informar o id"
    });
  } else {
    console.log("Dados recebidos:", req.body);
    updateProduto(req.body);
    res.json({
      "statusCode": "200"
    });
  }
});

app.delete('/produto', async function(req, res) {
  let produto = await deleteProduto(req.body.id);
  res.json(produto);
});

app.listen(3000, () => console.log("API rodando"));
