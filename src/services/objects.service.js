import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class ObjectsService {
    getObjects(section) {
        return axios.get(API_URL + '/objects/list/?section=' + section, { headers: authHeader() });
    } 

    getObjectBrief(section, id) {
        return axios.get(API_URL + '/objects/brief/?section=' + section + '&id=' + id, { headers: authHeader() });
    }

    getObjectFields(section, id) {
        return axios.get(API_URL + '/objects/fields/?section=' + section + '&id=' + id, { headers: authHeader() });
    }

    updateObject(data) {
        return axios.post(API_URL + '/objects/save', data, { headers: authHeader() });
    }
}

export default new ObjectsService();