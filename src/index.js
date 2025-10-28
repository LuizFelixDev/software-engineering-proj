import express from 'express'
import { createTable } from './controller/Produtos.js';
import router from './routes.js';

const app = express();
app.use(express.json());

await createTable();

app.use(router);

app.listen(3000, () => console.log("API rodando"));