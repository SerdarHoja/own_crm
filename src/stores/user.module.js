import { defineStore } from 'pinia';
import UserService from '../services/user.service';
import { message } from 'ant-design-vue';

export const useUserStore = defineStore('user', {
  state: () => ({
    places: [],
    regions: [],
    districts: [],
    vicinities: [],
    localities: [],
    highways: [],
    place: [],
    metro: [],
    metro_line: [],
    placesSubChild: [],
    optionData: [],
    village: [],
    zhk: []
  }),
  actions: {
    async getPlacesList() {
      try {
        const response = await UserService.getPlaces();
        this.places = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getPlacesChild(param) {
        try {
            const response = await UserService.getPlacesChild(param);
            if (param === 'regions') {
                this.regions = response.data.data;
            } else if (param === 'districts') {
                this.districts = response.data.data;
            } else if (param === 'vicinity') {
                this.vicinities = response.data.data;
            } else if (param === 'localities') {
                this.localities = response.data.data;
            } else if (param === 'highway') {
                this.highways = response.data.data;
            } else if (param === 'place') {
                this.place = response.data.data;
            } else if (param === 'metro') {
                this.metro = response.data.data;
            } else if (param === 'metro_line') {
                this.metro_line = response.data.data;
            } else if (param === 'village') {
              this.village = response.data.data;
            } else if (param === 'zhk') {
              this.zhk = response.data.data;
            }
            return response;
        } catch (error) {
          return Promise.reject(error);
        }
    },

    async addNewPlaceChild(data) {
        try {
            const response = await UserService.addNewPlaceChild(data);
            if (response.status === 200) {
                message.success('Успешно изменено');
            } else {
                console.error('Error fetching data:', response.statusText);
                message.error('Ошибка');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    async getPlacesSubChild(code, id) {
        try {
          const response = await UserService.getPlacesSubChild(code, id);
          this.placesSubChild = response.data.data;
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
    },

    async getOptionsData(code, id, entity) {
      try {
        const response = await UserService.getOptionData(code, id, entity);
        this.optionData = response.data.data;
        console.log("reeeee", this.optionData)
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
});
