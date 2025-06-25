import axios from "axios";
import { base_url } from "../../utils/baseURL.js";

// Create a new client
const createClient = async (formData) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios.post(`${base_url}clients`, formData, config);
    return response.data;
};

// Get all clients
const getClients = async () => {
    const response = await axios.get(`${base_url}clients`);
    return response.data;
};

// Delete a client
const deleteClient = async (id) => {
    const response = await axios.delete(`${base_url}clients/${id}`);
    return response.data;
};

const clientService = {
    createClient,
    getClients,
    deleteClient,
};

export default clientService;
