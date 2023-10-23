import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    status: {
      loggedIn: false,
    },
    user: null,
  }),
  actions: {
    async login(user) {
      try {
        const response = await AuthService.login(user);
        this.status.loggedIn = true;
        this.user = response;
        return response;
      } catch (error) {
        this.status.loggedIn = false;
        this.user = null;
        return Promise.reject(error);
      }
    },
    logout() {
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
    async register(user) {
      try {
        const response = await AuthService.register(user);
        this.status.loggedIn = false;
        return response.data;
      } catch (error) {
        this.status.loggedIn = false;
        return Promise.reject(error);
      }
    },
    async refresh(user) {
      try {
        const response = await AuthService.refresh(user);
        this.status.loggedIn = true;
        this.user = response;
        return response;
      } catch (error) {
        this.status.loggedIn = false;
        this.user = null;
        return Promise.reject(error);
      }
    },
  },
});
