import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class ClientService {
  getMe() {
    return axios.get(API_URL + '/user/', { headers: authHeader() });
  }

  getClients() {
    return axios.get(API_URL + '/clients/list/', { headers: authHeader() });
  }

  getClientData(param) {
    return axios.get(API_URL + '/clients/data/?id=' + param, { headers: authHeader() });
  }
}

export default new ClientService();