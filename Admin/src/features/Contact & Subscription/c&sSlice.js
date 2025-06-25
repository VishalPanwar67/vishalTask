import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./c&sService.js";  // Import the contactService file

// Async thunk to fetch all contacts
export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    const contacts = await contactService.getContact();
    return contacts;
});

// Async thunk to fetch all subscriptions
export const fetchSubscriptions = createAsyncThunk(
    "subscriptions/fetchSubscriptions",
    async () => {
        const subscriptions = await contactService.getSubscribed();
        return subscriptions;
    }
);

// Initial state
const initialState = {
    contacts: [],
    subscriptions: [],
    loading: false,
    error: null,
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch contacts
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch subscriptions
            .addCase(fetchSubscriptions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptions = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;
