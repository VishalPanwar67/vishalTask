import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../features/Clients/clientSlice.js";
import projectSlice from "../features/Projects/projectSlice.js";
import contactSlice from "../features/Contact & Subscription/c&sSlice.js";


export const store = configureStore({
    reducer: {
        clients: clientSlice,
        projects: projectSlice,
        contact:contactSlice
    },
});

export default store;
