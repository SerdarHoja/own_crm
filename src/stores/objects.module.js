import { defineStore } from 'pinia';
import ObjectsService from '../services/objects.service';
import { message } from 'ant-design-vue';
import UserService from "@/services/user.service";

export const useObjectsStore = defineStore('objects', {
  state: () => ({
    countryObjects: [],
    countryCurrentObject: [],
    villagesObjects: [],
    objectBrief: [],
    objectFields: [],
    commentsList: [],
    objectStageOptions: [],
    optionData: [],
    villageFieldsValue: [],
    countryObjectsType: '1',
    newObjectFields: [],
    allNewFields: [],
    photos: [],
    listByOwner: [],
  }),
  actions: {
    async getObjects(section) {
      try {
        const response = await ObjectsService.getObjects(section, this.countryObjectsType);
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
        console.log (this.optionData);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getStagesOptions(entity, prop) {
      try {
        const response = await ObjectsService.getStagesOptions(entity, prop);  
          this.objectStageOptions = response.data.data;
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
    // Получение объекта по id
    async getObjectByID(section, param) {
      try {
        const response = await ObjectsService.getObjectByID(section, param);
        this.countryCurrentObject = response.data.data[0];
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getVillageData(id) {
      try {
        const response = await ObjectsService.getVillageData(id);
        this.villageFieldsValue = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getFieldsForNewObject(section) {
      try {
        const response = await ObjectsService.getFieldsForNewObject(section);
        this.newObjectFields = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getFieldsObject(section, id) {
      try {
        const response = await ObjectsService.getFieldsObject(section, id);
        this.allNewFields = response.data.data;
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
    
    async setPhotoAsMain(data) {
      try {
        const response = await ObjectsService.setPhotoAsMain(data);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async setPhotoPlan(data) {
      try {
        const response = await ObjectsService.setPhotoPlan(data);
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

    async getListByOwner(id) {
      try {
        const response = await ObjectsService.listByOwner(id);
        this.listByOwner = response.data;
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    
  },

});
