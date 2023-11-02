import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class OwnersService {

  getOwners() {
    return axios.get(API_URL + '/owners/list/', { headers: authHeader() });
  }
}

export default new OwnersService();