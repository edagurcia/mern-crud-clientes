import { configureStore } from "@reduxjs/toolkit";
import clienteReducer from "../features/clienteSlice";

export const store = configureStore({
	reducer: {
		cliente: clienteReducer,
	},
});
