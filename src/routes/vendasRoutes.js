import { Router } from "express";
import * as VendasController from '../controller/Vendas.js';

const router = Router();

router.get('/', VendasController.listarVendas);
router.get('/:id', VendasController.buscarPorId);
router.post('/', VendasController.registrarVenda);
router.put('/:id', VendasController.atualizarVenda);
router.delete('/:id', VendasController.removerVenda);

export default router;
