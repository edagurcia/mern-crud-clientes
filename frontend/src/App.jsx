import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import FormCliente from "./components/formCliente";
import ListadoClientes from "./components/listadoClientes";

function App() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<NavBar />
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={4} xl={3}>
					<FormCliente />
				</Col>
				<Col xs={12} md={8} xl={9}>
					<ListadoClientes />
				</Col>
			</Row>
			<ToastContainer />
		</Container>
	);
}

export default App;
