import { defineStore } from 'pinia';
import axios from 'axios';
import { message } from 'ant-design-vue';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    places: [],
    placesChild: [],
    placesSubChild: [],
    districts: [],
    vicinities: [],
    regions: [],
    localities: [],
    highways: []
  }),

  actions: {
    async fetchPlaces() {
      try {
        const response = await axios.get('/places/?test=1');
        
        if (response.status === 200) {
          this.places = response.data.data;
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchPlacesChild(param) {
      try {
        const response = await axios.get('/places/?code=' + param);
        if (response.status === 200) {
          // if (param === 'districts') {
          //   this.districts = response.data.data;
          // } else if (param === 'vicinities') {
          //   this.vicinities = response.data.data;
          // } else if (param === 'regions') {
          //   this.regions = response.data.data;
          // } else if (param === 'localities') {
          //   this.localities = response.data.data;
          // } else if (param === 'highways') {
          //   this.highways = response.data.data;
          // } else {
          //   this.placesChild = response.data.data;
          // }
          this.placesChild = response.data.data;

        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchPlacesSubChild(code, id) {
      try {
        const response = await axios.get('/places/fields/?code=' + code + '&id=' + id);
        if (response.status === 200) {
          this.placesSubChild = response.data.data.fields;
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addNewPlaceChild(data) {
      try {
        const response = await axios.post('/places/save/', data);
        if (response.status === 200) {
          console.log(response.data);
          message.success('Успешно изменено');
        } else {
          console.error('Error fetching data:', response.statusText);
          message.error('Ошибка');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
});