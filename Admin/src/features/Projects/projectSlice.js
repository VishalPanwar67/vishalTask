import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProject, getProjects, deleteProject } from './projectService';

// Initial state
const initialState = {
    projects: [],
    loading: false,
    error: null,
};

// Thunks for async actions
export const createNewProject = createAsyncThunk(
    'projects/create',
    async (projectData , { rejectWithValue }) => {
        try {
            const data = await createProject(projectData);
            return data.project;
        } catch (err) {
            return rejectWithValue("Failed to create project");
        }
    }
);

export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const projects = await getProjects();
            return projects;
        } catch (err) {
            return rejectWithValue("Failed to fetch projects");
        }
    }
);

export const removeProject = createAsyncThunk(
    'projects/delete',
    async (projectId, { rejectWithValue }) => {
        try {
            const data = await deleteProject(projectId);
            return data;
        } catch (err) {
            return rejectWithValue("Failed to delete project");
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
            .addCase(createNewProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            .addCase(createNewProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
            })
            .addCase(removeProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter(
                    (project) => project._id !== action.payload.id
                );
            })
            .addCase(removeProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default projectSlice.reducer;
