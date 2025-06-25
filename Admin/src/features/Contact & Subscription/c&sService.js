import axios from "axios";
import { base_url } from "../../utils/baseURL.js";


// Get all clients
const getContact = async () => {
    const response = await axios.get(`${base_url}contacts`);
    return response.data;
};


// Get all clients
const getSubscribed = async () => {
    const response = await axios.get(`${base_url}subscriptions`);
    return response.data;
};


const contactService = {
    getSubscribed,
    getContact
};

export default contactService ;