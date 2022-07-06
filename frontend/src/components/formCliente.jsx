import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { addCliente, putCliente, cleanCliente } from "../features/clienteSlice";

const FormCliente = () => {
	const [nombre, setNombre] = useState("");
	const [mobil, setMobil] = useState("");
	const [correo, setCorreo] = useState("");
	const [activo, setActivo] = useState(false);

	const { clienteSel, isError, isSaved, isUpdated, message } = useSelector(
		(state) => state.cliente
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (clienteSel?._id) {
			setNombre(clienteSel?.nombre);
			setMobil(clienteSel?.mobil);
			setCorreo(clienteSel?.correo);
			setActivo(clienteSel?.activo);
		} else {
			setNombre("");
			setMobil("");
			setCorreo("");
			setActivo(false);
		}
	}, [clienteSel]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSaved) {
			limpiarForm();
			toast.success("Cliente almacenado existosamente");
		}

		return () => {
			limpiarForm();
		};
	}, [isError, isSaved, message, dispatch]);

	useEffect(() => {
		if (isUpdated) {
			limpiarForm();
			dispatch(cleanCliente());
			toast.success("Cliente actualizado existosamente");
		}
	}, [isUpdated]);

	const limpiarForm = () => {
		setNombre("");
		setMobil("");
		setCorreo("");
		setActivo(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([nombre, mobil, correo].includes("")) {
			toast.error("Todos los campos son obligatorios");
			return;
		}

		const cliente = {
			nombre,
			mobil,
			correo,
			activo,
		};

		if (clienteSel?._id) {
			cliente._id = clienteSel._id;
			dispatch(putCliente(cliente));
		} else {
			dispatch(addCliente(cliente));
		}
	};

	const limpiarCliente = () => {
		dispatch(cleanCliente());
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formNombre">
				<Form.Label>Nombre</Form.Label>
				<Form.Control
					type="text"
					placeholder="Nombre..."
					maxLength={50}
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formEmail">
				<Form.Label>Correo electrónico</Form.Label>
				<Form.Control
					type="email"
					placeholder="Correo electrónico..."
					maxLength={100}
					value={correo}
					onChange={(e) => setCorreo(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formMobil">
				<Form.Label>Celular</Form.Label>
				<Form.Control
					type="text"
					placeholder="Número de celular"
					maxLength={13}
					value={mobil}
					onChange={(e) => setMobil(e.target.value)}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Check
					type="switch"
					label="Activo"
					checked={activo}
					onChange={() => setActivo(!activo)}
				/>
			</Form.Group>
			<br />
			<Button variant="primary" type="submit">
				{clienteSel?._id ? "Actualizar" : "Guardar"}
			</Button>
			<Button
				variant="secondary"
				type="button"
				style={{ marginLeft: "10px" }}
				onClick={limpiarCliente}
			>
				Limpiar
			</Button>
		</Form>
	);
};

export default FormCliente;
