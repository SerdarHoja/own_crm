import { defineStore } from 'pinia';
import ObjectsService from '../services/objects.service';
import { message } from 'ant-design-vue';

export const useObjectsStore = defineStore('objects', {
  state: () => ({
    countryObjects: [],
  }),
  actions: {
    async getObjects(section) {
      try {
        const response = await ObjectsService.getObjects(section);
        if (section === 'country') {
            this.countryObjects = response.data.data;
            return response;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
