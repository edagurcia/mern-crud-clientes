import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clienteService from "./clienteService";

// estado inicial del reducer
const initialState = {
	clientes: [],
	clienteSel: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	isSaved: false,
	isUpdated: false,
	isDeleted: false,
	message: "",
};

// funciones de fetch
export const getClientes = createAsyncThunk(
	"clientes/getAll",
	async (_, thunkAPI) => {
		try {
			return await clienteService.getClientes();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getCliente = createAsyncThunk(
	"clientes/getOne",
	async (idCliente, thunkAPI) => {
		try {
			return await clienteService.getCliente(idCliente);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addCliente = createAsyncThunk(
	"clientes/addCliente",
	async (cliente, thunkAPI) => {
		try {
			return await clienteService.addCliente(cliente);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const putCliente = createAsyncThunk(
	"clientes/putCliente",
	async (cliente, thunkAPI) => {
		try {
			return clienteService.putCliente(cliente);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const delCliente = createAsyncThunk(
	"clientes/delCliente",
	async (cliente, thunkAPI) => {
		try {
			return clienteService.delCliente(cliente);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const cleanCliente = createAsyncThunk(
	"clientes/cleanCliente",
	async () => {}
);

// reducer de la aplicacion
export const clienteSlice = createSlice({
	name: "cliente",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getClientes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getClientes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clientes = action.payload;
			})
			.addCase(getClientes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCliente.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCliente.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clienteSel = action.payload;
			})
			.addCase(getCliente.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addCliente.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addCliente.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isSaved = true;
				state.clientes.push(action.payload);
			})
			.addCase(addCliente.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(cleanCliente.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = false;
				state.isDeleted = false;
				state.isSaved = false;
				state.isUpdated = false;
				state.clienteSel = null;
			})
			.addCase(putCliente.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(putCliente.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isUpdated = true;
				state.clientes = state.clientes.map((clienteState) =>
					clienteState._id === action.payload._id
						? action.payload
						: clienteState
				);
			})
			.addCase(putCliente.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(delCliente.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(delCliente.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isDeleted = true;
				state.clientes = state.clientes.filter(
					(cliente) => cliente._id !== action.payload.id
				);
			})
			.addCase(delCliente.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = clienteSlice.actions;
export default clienteSlice.reducer;
