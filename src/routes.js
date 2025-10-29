import { Router } from "express";
import produtosRoutes from './routes/produtosRoutes.js';
import vendasRoutes from './routes/vendasRoutes.js';
import relatoriosRoutes from './routes/relatoriosRoutes.js';

const router = Router();

router.get('/', (req, res) => res.json({ statusCode: 200, msg: "API rodando" }));

router.use('/produtos', produtosRoutes);
router.use('/vendas', vendasRoutes);
router.use('/relatorios', relatoriosRoutes);

export default router;
