import express from "express";
import {
	getClientes,
	getCliente,
	postCliente,
	putCliente,
	deleteCliente,
} from "../controllers/clientesController.js";

const router = express.Router();

router.get("/", getClientes);
router.get("/:idCliente", getCliente);
router.post("/", postCliente);
router.put("/:idCliente", putCliente);
router.delete("/:idCliente", deleteCliente);

export default router;
