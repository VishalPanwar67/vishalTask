import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "./clientService";

export const getClients = createAsyncThunk(
    "clients/getAll",
    async (_, thunkAPI) => {
        try {
            return await clientService.getClients();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Slice
const clientSlice = createSlice({
    name: "clients",
    initialState: {
        clients: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Clients
            .addCase(getClients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.clients = action.payload;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
