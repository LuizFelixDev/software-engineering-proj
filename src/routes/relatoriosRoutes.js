import { Router } from "express";
import * as ProdutosController from '../controller/Produtos.js';
import * as VendasController from '../controller/Vendas.js';

const router = Router();

router.get('/estoque', ProdutosController.relatorioEstoque);
router.get('/vendas', VendasController.relatorioVendas);

export default router;
