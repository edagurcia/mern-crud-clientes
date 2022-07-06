import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Cliente from "../models/clienteModel.js";

// @desc    obtener clientes
// @route   GET /api/clientes
// @access  Public
const getClientes = asyncHandler(async (req, res) => {
	const clientes = await Cliente.find();
	res.status(200).json(clientes);
});

// @desc    ver cliente
// @route   GET /api/clientes/:idCliente
// @access  Public
const getCliente = asyncHandler(async (req, res) => {
	const { idCliente } = req.params;
	if (mongoose.Types.ObjectId.isValid(idCliente)) {
		try {
			const cliente = await Cliente.findById(idCliente);

			if (!cliente) {
				const error = new Error("Cliente no registrado");
				return res.status(404).json({ msg: error.message });
			}

			res.status(200).json(cliente);
		} catch (error) {
			console.log(error);
		}
	} else {
		const error = new Error("Hubo un error en la busqueda");
		return res.status(500).json({ msg: error.message });
	}
});

// @desc    guardar nuevo cliente
// @route   POST /api/clientes
// @access  Public
const postCliente = asyncHandler(async (req, res) => {
	const { nombre, mobil, correo, activo } = req.body;

	if ([nombre, mobil, correo].includes("")) {
		res.status(400);
		throw new Error("Toda la información del cliente es obligatoria");
	}

	try {
		const cliente = await Cliente.create({
			nombre,
			mobil,
			correo,
			activo,
		});
		res.status(200).json(cliente);
	} catch (error) {
		console.log(error);
	}
});

// @desc    actualizar cliente
// @route   PUT /api/clientes/:idCliente
// @access  Public
const putCliente = asyncHandler(async (req, res) => {
	const { nombre, mobil, correo } = req.body;
	const { idCliente } = req.params;
	if (mongoose.Types.ObjectId.isValid(idCliente)) {
		const cliente = await Cliente.findById(idCliente);

		if (!cliente) {
			const error = new Error("Cliente no registrado");
			return res.status(404).json({ msg: error.message });
		}

		cliente.nombre = nombre || cliente.nombre;
		cliente.mobil = mobil || cliente.mobil;
		cliente.correo = correo || cliente.correo;

		if (!req.body.activo) {
			cliente.activo = false;
		} else {
			cliente.activo = true;
		}

		try {
			await cliente.save();
			res.status(200).json(cliente);
		} catch (error) {
			console.log(error);
		}
	} else {
		const error = new Error("Hubo un error en la busqueda");
		return res.status(500).json({ msg: error.message });
	}
});

// @desc    eliminar cliente
// @route   DELETE /api/clientes/:idCliente
// @access  Public
const deleteCliente = asyncHandler(async (req, res) => {
	const { idCliente } = req.params;
	if (mongoose.Types.ObjectId.isValid(idCliente)) {
		const cliente = await Cliente.findById(idCliente);

		if (!cliente) {
			const error = new Error("Cliente no registrado");
			return res.status(404).json({ msg: error.message });
		}

		try {
			await cliente.remove();
			res.status(200).json({ id: idCliente });
		} catch (error) {
			console.log(error);
		}
	} else {
		const error = new Error("Hubo un error en la busqueda");
		return res.status(500).json({ msg: error.message });
	}
});

export { getClientes, getCliente, postCliente, putCliente, deleteCliente };
