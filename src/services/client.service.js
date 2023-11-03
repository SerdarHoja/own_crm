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

  createNewClient(data) {
    return axios.post(API_URL + '/clients/save/', data, { headers: authHeader() });
  }

  deleteClient(data) {
    return axios.post(API_URL + '/clients/delete/', data, { headers: authHeader() });
  }

  i
}

export default new ClientService();