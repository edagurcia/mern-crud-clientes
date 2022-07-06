import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import { errorHandler } from "./middlewares/errorHandler.js";
import mongoDB from "./db/db.js";
import clienteRoutes from "./routes/clienteRoutes.js";

// inicializar configuraciones de servidor express
const port = process.env.PORT || 5000;
dotenv.config();
const app = express();
mongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas de la api
app.use("/api/clientes", clienteRoutes);

// iniciar frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "../", "frontend", "dist", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => res.send("Por favor configurar para producción"));
}

// utilizar el middleware para manejo de errores de servidor
app.use(errorHandler);

// iniciar el servidor express
app.listen(port, () => {
	console.log(`Servidor Express en puerto ${port}`.blue.underline);
});
