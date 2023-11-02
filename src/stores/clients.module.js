import { defineStore } from 'pinia';
import ClientService from '../services/client.service';
// import { message } from 'ant-design-vue';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    client: {},
  }),
  actions: {
    async getClientsList() {
      try {
        const response = await ClientService.getClients();
        this.clients = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getClientData(param) {
      try {
        const response = await ClientService.getClientData(param);
        this.client = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
