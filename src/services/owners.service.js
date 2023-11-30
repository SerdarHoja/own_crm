import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class OwnerService {
  getMe() {
    return axios.get(API_URL + '/user/', { headers: authHeader() });
  }

  getOwners() {
    return axios.get(API_URL + '/owners/list/', { headers: authHeader() });
  }

  getOwnerData(param) {
    return axios.get(API_URL + '/owners/data/?id=' + param, { headers: authHeader() });
  }

  createNewOwner(data) {
    return axios.post(API_URL + '/owners/save/', data, { headers: authHeader() });
  }

  deleteOwner(data) {
    return axios.post(API_URL + '/owners/delete/', data, { headers: authHeader() });
  }
  getOwnerFields() {
    return axios.get(API_URL + '/owners/fields/', { headers: authHeader() });
  }
}

export default new OwnerService();