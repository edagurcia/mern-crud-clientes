import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
	getClientes,
	reset,
	getCliente,
	cleanCliente,
	delCliente,
} from "../features/clienteSlice";
import Spinner from "./spinner";

const ListadoClientes = () => {
	const [show, setShow] = useState(false);

	const { clientes, clienteSel, isError, isLoading, message, isDeleted } =
		useSelector((state) => state.cliente);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getClientes());

		return () => dispatch(reset());
	}, [isError, message, dispatch]);

	useEffect(() => {
		if (isDeleted) {
			toast.success("Cliente eliminado exitosamente");
			dispatch(cleanCliente());
			setShow(false);
		}
	}, [isDeleted]);

	const handleObtenerCliente = (idCliente) => {
		dispatch(getCliente(idCliente));
	};

	const handleClose = () => {
		dispatch(cleanCliente());
		setShow(false);
	};

	const handleShow = (idCliente) => {
		dispatch(getCliente(idCliente));
		setShow(true);
	};

	const handleEliminar = (idCliente) => {
		dispatch(delCliente(idCliente));
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<Table responsive="sm">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Correo</th>
						<th>Celular</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{clientes.map((cliente) => (
						<tr key={cliente._id}>
							<td>{cliente.nombre}</td>
							<td>{cliente.mobil}</td>
							<td>{cliente.correo}</td>
							<td>
								<FaEdit
									className="editar"
									title="Editar Cliente"
									onClick={() => handleObtenerCliente(cliente._id)}
								/>{" "}
								<FaTrash
									className="eliminar"
									onClick={() => handleShow(cliente._id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar Cliente</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Esta a punto de eliminar al cliente {clienteSel?.nombre}, no se puede
					restaurar después de eliminado.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
					<Button
						variant="danger"
						onClick={() => handleEliminar(clienteSel?._id)}
					>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ListadoClientes;
