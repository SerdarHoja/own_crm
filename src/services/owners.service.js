import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://crm.web-hands.ru/api/v1';

class OwnerService {
  getMe() {
    return axios.get(API_URL + '/user/data/', { headers: authHeader() });
  }

  getOwners(param) {
    return axios.get(API_URL + '/owners/list/?' + param, { headers: authHeader() });
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
  addEdbindingObject(data) {
    return axios.post(API_URL + '/owners/addedbindingobject/', data, { headers: authHeader() });
  }
  deleteBindingObject(data) {
    return axios.post(API_URL + '/owners/deletebindingobject/', data, { headers: authHeader() });
  }

}

export default new OwnerService();