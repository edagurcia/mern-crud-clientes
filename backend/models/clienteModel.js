import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			trim: true,
			required: true,
		},
		mobil: {
			type: String,
			trim: true,
			required: true,
		},
		correo: {
			type: String,
			trim: true,
			required: true,
		},
		activo: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
