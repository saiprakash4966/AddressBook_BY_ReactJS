import axios from "axios";
import config from '../config/config';


class Services {
    baseURL = config.baseURL;

    addContact = (data) => {
        return axios.post(`${this.baseURL}/create`, data);
    }

    getContacts = () => {
        return axios.get(`${this.baseURL}/`);
    }

    deleteContact = (id) => {
        return axios.delete(`${this.baseURL}/delete/${id}`);
    }

    getContact(id) {
        return axios.get(`${this.baseURL}/get/${id}`);
    }

    updateContact(id,data) {
        return axios.put(`${this.baseURL}/update/${id}`, data);
    }
    sortByCity() {
        return axios.get(`${this.baseURL}/sortbycity`);
    }

    sortByState() {
        return axios.get(`${this.baseURL}/sortbystate`);
    }

}
export default new Services();