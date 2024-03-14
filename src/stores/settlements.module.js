import { defineStore } from 'pinia';
import ObjectsService from '../services/objects.service';
import { message } from 'ant-design-vue';
import UserService from "@/services/user.service";

export const useSettlementsStore = defineStore('settlements', {
  state: () => ({
    countryObjects: [],
    objectBrief: [],
    objectFields: [],
    commentsList: [],
    optionData: [],
    photos: [],
    newObjectFields: [],
    allNewFields: [],
  }),
  actions: {
    async getObjects(section) {
      try {
        const response = await ObjectsService.getObjects(section);
          this.countryObjects = response.data.data;
          return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getObjectBrief(section, id) {
      try {
        const response = await ObjectsService.getObjectBrief(section, id);
        this.objectBrief = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getObjectFields(section, id) {
      try {
        const response = await ObjectsService.getObjectFields(section, id);
        this.objectFields = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateObject(data) {
      try {
        const response = await ObjectsService.updateObjectTEST(data);
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
    },

    async sendCheckboxValueToServer(id, isChecked) {
      try {
        const response = await ObjectsService.updateCheckboxValue(id, isChecked);
        return response
      } catch (error) {
        console.error(error);
        return Promise.reject(error)
      }
    },
    async getOptionsData(code, id, entity) {
      try {
        const response = await ObjectsService.getOptionData(code, id, entity);
        this.optionData = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getObjectList(section, param) {
      try {
        const response = await ObjectsService.getObjectsFilter(section, param);
        this.countryObjects = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async uploadNewPhoto(data) {
      try {
        const response = await ObjectsService.uploadNewPhoto(data);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async removePhoto(data) {
      try {
        const response = await ObjectsService.removePhoto(data);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getObjectPhotos(id) {
      try {
        const response = await ObjectsService.getObjectPhotos(id);
        this.photos = response.data.data
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
