import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

// Initial state
const initialState = {
    projects: [],
    loading: false,
    error: null,
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await projectService.getProjects();
        } catch (err) {
            return rejectWithValue("Failed to fetch projects");
        }
    }
);

// Slice
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default projectSlice.reducer;
