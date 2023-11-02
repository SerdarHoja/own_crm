import { defineStore } from 'pinia';
import OwnersService from '../services/owners.service';
// import { message } from 'ant-design-vue';

export const useOwnersStore = defineStore('owners', {
  state: () => ({
    owners: [],
    client: {},
  }),
  actions: {
    async getOwnersList() {
      try {
        const response = await OwnersService.getOwners();
        this.owners = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // async getClientData(param) {
    //   try {
    //     const response = await ClientService.getClientData(param);
    //     this.client = response.data.data;
    //     return response;
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
  },
});
