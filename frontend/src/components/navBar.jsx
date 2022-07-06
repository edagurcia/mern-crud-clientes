import { Container, Navbar } from "react-bootstrap";

const NavBar = () => {
	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg"
			style={{ marginBottom: "50px" }}
		>
			<Container>
				<Navbar.Brand href="#home">
					MERN - redux-toolkit - Bootstrap
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default NavBar;
