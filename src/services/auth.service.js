import axios from 'axios';

const API_URL = "https://crm.web-hands.ru/api/v1";

class AuthService {
  
  async login(formdata) {
    const response = await axios.post(API_URL + '/user/auth/', formdata);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      return response.data;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  // async refresh(user) {
  //   const response = await axios
  //     .post(API_URL, localStorage.getItem('user'));
  //   if (response.data.token) {
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //   }
  //   return response.data;
  // }

  async refreshToken() {
    const refreshToken = localStorage.getItem('user.refresh_token');
    const refreshTokenExpired = new Date(localStorage.getItem('user.refresh_token_expired'));
    
    // Check if the refresh token is present and not expired
    if (refreshToken && refreshTokenExpired > new Date()) {
      const response = await axios.post(API_URL, { refresh_token: refreshToken });
      
      // Check if the response contains a new token
      if (response.data.token) {
        const newToken = response.data.token;
        const newTokenExpired = new Date(response.data.token_expired);
  
        // Check if the new token is not expired
        if (newTokenExpired > new Date()) {
          // Update the token in local storage
          localStorage.setItem('token', newToken);
          localStorage.setItem('token_expired', newTokenExpired.toISOString());
          localStorage.setItem('result', response.data.result);
  
          return response.data.result;
        }
      }
    }
  
    // If the refresh token is expired or any other condition fails, return an appropriate value
    return 'error';
  }
}

export default new AuthService();