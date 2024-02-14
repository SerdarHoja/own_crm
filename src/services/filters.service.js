import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://crm.web-hands.ru/api/v1';

class FilterService {
    getFilters(entity) {
        return axios.get(API_URL + '/filter/list/?entity=' + entity, { headers: authHeader() });
    }
}


export default new FilterService();