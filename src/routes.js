import { Router } from "express";
import { createTable, insertProduto, updateProduto, selectProdutos, selectProduto, deleteProduto } from './controller/Produtos.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "API rodando"
    })
})

router.get('/produtos', selectProdutos);
router.get('/produto', selectProduto);
router.post("/produto", insertProduto);
router.put("/produto", updateProduto);
router.delete("/produto", deleteProduto);

export default router;