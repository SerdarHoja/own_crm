import { defineStore } from 'pinia';
import OwnerService from '../services/owners.service';
import { message } from 'ant-design-vue';

export const useOwnerStore = defineStore('owner', {
  state: () => ({
    owners: [],
    owner: {},
    ownerFields: []
  }),
  actions: {
    async getOwnersList(param) {
      try {
        const response = await OwnerService.getOwners(param);
        this.owners = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getOwnerData(param) {
      try {
        const response = await OwnerService.getOwnerData(param);
        console.log(response.data.data);
        this.owner = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async createNewOwner(data) {
      try {
          const response = await OwnerService.createNewOwner(data);
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

    async deleteOwner(data) {
      try {
          const response = await OwnerService.deleteOwner(data);
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

    async getOwnerFields() {
      try {
        const response = await OwnerService.getOwnerFields();
        this.ownerFields = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
    async addEdbindingObject(data) {
      try {
        const response = await OwnerService.addEdbindingObject(data);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
    async deleteBindingObject(data) {
      try {
        const response = await OwnerService.deleteBindingObject(data);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
//изменение данных владельца
    async updateOwnerData(id, newData) {
      try {
        const response = await OwnerService.updateOwnerData(id, newData);
        return response.data;
      } catch (error) {
        console.error('Ошибка обновления данных собственника:', error);
        return Promise.reject(error);
      }
    },

  },
});
