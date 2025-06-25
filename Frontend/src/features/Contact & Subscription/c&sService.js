import axios from "axios";
import { base_url } from "../../utils/baseURL.js";

// Service to handle subscriptions
const subscribe = async (email) => {
    const response = await axios.post(`${base_url}subscriptions`, { email });
    return response.data;
};

// Service to handle contact submissions
const submitContact = async (contactData) => {
    const response = await axios.post(`${base_url}contacts`, contactData);
    return response.data;
};

// Exporting the service functions
const contactService = {
    subscribe,
    submitContact,
};

export default contactService;
