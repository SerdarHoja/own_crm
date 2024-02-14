import { defineStore } from 'pinia';
import ObjectsService from '../services/objects.service';
import { message } from 'ant-design-vue';

export const useObjectsStore = defineStore('objects', {
  state: () => ({
    countryObjects: [],
    objectBrief: [],
    objectFields: [],
    commentsList: []
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

    async getObjectBrief(section, id) {
      try {
        const response = await ObjectsService.getObjectBrief(section, id);
        if (section === 'country') {
            this.objectBrief = response.data.data;
            return response;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getObjectFields(section, id) {
      try {
        const response = await ObjectsService.getObjectFields(section, id);
        if (section === 'country') {
            this.objectFields = response.data.data;
            return response;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async updateObject(data) {
      try {
        const response = await ObjectsService.updateObject(data);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    },

    async getComments(id) {
      try {
        const response = await ObjectsService.getComments(id);  
          this.commentsList = response.data.data;
          return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async deleteComment(data) {
      try {
        const response = await ObjectsService.deleteComment(data);
        if (response.data.code === 200) {
            message.success(response.data.data);
        } else {
            console.error('Error fetching data:', response.statusText);
            message.error(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  },
});
