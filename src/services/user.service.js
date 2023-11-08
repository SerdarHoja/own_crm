import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://crm.web-hands.ru/api/v1';

class UserService {
  getMe() {
    return axios.get(API_URL + '/user/', { headers: authHeader() });
  }

  getPlaces() {
    return axios.get(API_URL + '/place/list/', { headers: authHeader() });
  }

  getPlacesChild(param) {
    return axios.get(API_URL + '/places/?code=' + param, { headers: authHeader() });
  }

  getPlacesSubChild(code, id) {
    return axios.get(API_URL + '/place/fields/?place=' + code + '&id=' + id, { headers: authHeader() });
  }

  addNewPlaceChild(data) {
    return axios.post(API_URL + '/places/save/', data, { headers: authHeader() });
  }

  getOptionData(code) {
    return axios.get(API_URL + '/options/list/?prop=' + code, { headers: authHeader() });
  }
}

export default new UserService();