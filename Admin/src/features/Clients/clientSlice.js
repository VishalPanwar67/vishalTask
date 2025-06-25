import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "./clientService";

// Thunks
export const createClient = createAsyncThunk(
    "clients/create",
    async (formData, thunkAPI) => {
        try {
            return await clientService.createClient(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

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

export const deleteClient = createAsyncThunk(
    "clients/delete",
    async (id, thunkAPI) => {
        try {
            return await clientService.deleteClient(id);
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
            // Create Client
            .addCase(createClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.clients.push(action.payload.client);
            })
            .addCase(createClient.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
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
            })
            // Delete Client
            .addCase(deleteClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.clients = state.clients.filter(
                    (client) => client._id !== action.meta.arg
                );
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = clientSlice.actions;
export default clientSlice.reducer;
