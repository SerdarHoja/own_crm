import { defineStore } from 'pinia';
import ObjectsService from '../services/objects.service';
import { message } from 'ant-design-vue';
import UserService from "@/services/user.service";

export const useSettlementsStore = defineStore('settlements', {
  state: () => ({
    countryObjects: [],
    countryObjectsTotal: 0,
    countryObjectsLimit: 0,
    countryObjectsCurrentPage: 1,
    countryObjectsFilter: '',
    objectBrief: [],
    objectFields: [],
    commentsList: [],
    optionData: [],
    photos: [],
    newObjectFields: [],
    allNewFields: [],
    showAddVillagesButton: false,
  }),
  actions: {
    async getObjects(section) {
      try {
        const response = await ObjectsService.getObjects(section);
          this.countryObjects = response.data.data;
          this.countryObjectsTotal = response.data.total;
          this.countryObjectsLimit = response.data.limit;
          return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getObjectsPage(section, page) {
      try {
        const response = await ObjectsService.getObjectsPage(section, page, this.countryObjectsFilter);
          this.countryObjects = response.data.data;
          this.countryObjectsTotal = response.data.total;
          this.countryObjectsLimit = response.data.limit;
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
        console.log(param)
        const response = await ObjectsService.getObjectsFilter(section, param);
        this.countryObjectsFilter = param;
        this.countryObjects = response.data.data;
        this.countryObjectsTotal = response.data.total
        this.countryObjectsLimit = response.data.limit;
        this.countryObjectsCurrentPage = 1;
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
    async sortPhoto(data) {
      try {
        const response = await ObjectsService.sortPhoto(data);
        console.log(response);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getObjectPhotos(id) {
      try {
        const response = await ObjectsService.getObjectPhotos(id);
        this.photos = response.data.data
        console.log
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async setPhotoAsMain(data) {
      try {
        const response = await ObjectsService.setPhotoAsMain(data);
        console.log(response)
        // return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async setPhotoPlan(data) {
      try {
        const response = await ObjectsService.setPhotoPlan(data);
        console.log(response)
        // return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
