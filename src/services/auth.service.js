import axios from 'axios';

const API_URL = "http://crm.web-hands.ru/api/v1";

class AuthService {
  
  login(formdata) {
    return axios.post(API_URL + '/user/auth/', formdata)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          return response.data;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  refresh(user) {
    return axios
      .post(API_URL, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new AuthService();