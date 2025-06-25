import axios from "axios";
import { base_url } from "../../utils/baseURL.js";

// Get all clients
const getClients = async () => {
    const response = await axios.get(`${base_url}clients`);
    return response.data;
};

const clientService = {
    getClients,
};

export default clientService;
