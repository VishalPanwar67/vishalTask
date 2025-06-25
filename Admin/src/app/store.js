import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../features/Clients/clientSlice.js";
import projectSlice from "../features/Projects/projectSlice.js";
import dataSlice from "../features/Contact & Subscription/c&sSlice.js";


export const store = configureStore({
    reducer: {
        clients: clientSlice,
        projects: projectSlice,
        data:dataSlice
    },
});

export default store;
