import { defineStore } from 'pinia';
import ClientService from '../services/client.service';
import { message } from 'ant-design-vue';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    client: {},
    clientFields: []
  }),
  actions: {
    async getClientsList(param) {
      console.log("param clients module: ", param)
      try {
        const response = await ClientService.getClients(param);
        this.clients = response.data;
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

    async createNewClient(data) {
      try {
          const response = await ClientService.createNewClient(data);
          console.log("resssspo", response)
          if (response.data.code === 200) {
              message.success(response.data.data);
          } else {
              console.error('Error fetching data:', response.statusText);
              message.error(response.data.data);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    },

    async deleteClient(data) {
      try {
          const response = await ClientService.deleteClient(data);
          if (response.data.code === 200) {
              message.success(response.data.data);
          } else {
              console.error('Error fetching data:', response.statusText);
              message.error(response.data.data);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    },

    async getClientFields() {
      try {
        const response = await ClientService.getClientFields();
        this.clientFields = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
//Изменение данных клиента
    async updateClientData(id, newData) {
      try {
        const response = await OwnerService.updateClientData(id, newData);
        return response.data;
      } catch (error) {
        console.error('Ошибка обновления данных собственника:', error);
        return Promise.reject(error);
      }
    },
  },
});
