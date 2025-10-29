import { Router } from "express";
import * as ProdutosController from '../controller/Produtos.js';

const router = Router();

router.get('/', ProdutosController.selectProdutos);
router.get('/:id', ProdutosController.selectProduto);
router.post('/', ProdutosController.insertProduto);
router.put('/', ProdutosController.updateProduto);
router.delete('/:id', ProdutosController.deleteProduto);

export default router;
