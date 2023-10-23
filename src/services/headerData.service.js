import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class HeaderDataService {
  getMe() {
    return axios.get(API_URL + '/user/', { headers: authHeader() });
  } 
}

export default new HeaderDataService(); 