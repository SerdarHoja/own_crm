import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://crm.web-hands.ru/api/v1';

class HeaderDataService {
  getMe() {
    return axios.get(API_URL + '/user/', { headers: authHeader() });
  } 

  getCurrencyData() {
    return axios.get(API_URL + '/currency/rate', { headers: authHeader() });
  }
}

export default new HeaderDataService(); 