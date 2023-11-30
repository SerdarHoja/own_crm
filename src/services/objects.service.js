import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class ObjectsService {
    getObjects(section) {
        return axios.get(API_URL + '/objects/list/?section=' + section, { headers: authHeader() });
    }
}

export default new ObjectsService();