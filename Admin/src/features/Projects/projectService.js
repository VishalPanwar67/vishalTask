import axios from 'axios';
import { base_url } from "../../utils/baseURL.js";

// Create a project
export const createProject = async (formData, image) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    const response = await axios.post(`${base_url}projects/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Get all projects
export const getProjects = async () => {
    const response = await axios.get(`${base_url}projects/`);
    return response.data;
};

// Delete a project
export const deleteProject = async (projectId) => {
    const response = await axios.delete(`${base_url}projects/${projectId}`);
    return response.data;
};
