import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./c&sService.js";

// Async thunk for subscribing
export const subscribe = createAsyncThunk(
    "contact/subscribe",
    async (email, { rejectWithValue }) => {
        try {
            return await contactService.subscribe(email);
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Subscription failed");
        }
    }
);

// Async thunk for submitting contact
export const submitContact = createAsyncThunk(
    "contact/submitContact",
    async (contactData, { rejectWithValue }) => {
        try {
            return await contactService.submitContact(contactData);
        } catch (err) {
            return rejectWithValue(err.response.data.message || "Contact submission failed");
        }
    }
);

// Slice for managing state
const contactSlice = createSlice({
    name: "contact",
    initialState: {
        subscriptionStatus: null,
        contactStatus: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetStatus: (state) => {
            state.subscriptionStatus = null;
            state.contactStatus = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Subscription actions
            .addCase(subscribe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptionStatus = action.payload.message;
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Contact submission actions
            .addCase(submitContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contactStatus = action.payload.message;
            })
            .addCase(submitContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
