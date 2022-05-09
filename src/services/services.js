import axios from "axios";
import config from '../config/config';


class Services {
    baseURL = config.baseURL;

    addContact = (data) => {
        return axios.post(`${this.baseURL}addressBook`, data);
    }

    getContacts = () => {
        return axios.get(`${this.baseURL}addressBook`);
    }

    deleteContact = (id) => {
        return axios.delete(`${this.baseURL}addressBook/${id}`);
    }

    getContact(id) {
        return axios.get(`${this.baseURL}addressBook/${id}`);
    }

    updateContact(id,data) {
        return axios.put(`${this.baseURL}addressBook/${id}`, data);
    }
}
export default new Services();