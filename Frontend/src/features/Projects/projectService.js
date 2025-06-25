import axios from 'axios';
import { base_url } from "../../utils/baseURL.js";

// Get all projects
const getProjects = async () => {
    const response = await axios.get(`${base_url}projects/`);
    return response.data;
};


const projectService = {
    getProjects,
};

export default projectService;