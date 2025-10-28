import { Router } from "express";
import * as ProdutosController from './controller/Produtos.js'; 

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "API rodando"
    });
});

function setupProdutosRoutes() {
    router.get('/produtos', ProdutosController.selectProdutos);
    router.get('/produto', ProdutosController.selectProduto);
    router.post("/produto", ProdutosController.insertProduto);
    router.put("/produto", ProdutosController.updateProduto);
    router.delete("/produto", ProdutosController.deleteProduto);
}

setupProdutosRoutes(); 

export default router;