import axios from "axios";

const API_URL = "/api/clientes";

// obtener todos los clientes
const getClientes = async () => {
	const res = await axios.get(API_URL);

	return res.data;
};

// obtener cliente
const getCliente = async (idCliente) => {
	const res = await axios.get(`${API_URL}/${idCliente}`);

	return res.data;
};

// crear nuevo cliente
const addCliente = async (cliente) => {
	const res = await axios.post(API_URL, cliente);

	return res.data;
};

// editar cliente
const putCliente = async (cliente) => {
	const res = await axios.put(`${API_URL}/${cliente._id}`, cliente);

	return res.data;
};

// eliminar cliente
const delCliente = async (idCliente) => {
	const res = await axios.delete(`${API_URL}/${idCliente}`);

	return res.data;
};

const clienteService = {
	getClientes,
	getCliente,
	addCliente,
	putCliente,
	delCliente,
};

export default clienteService;
