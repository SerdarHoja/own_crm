// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { message } from 'ant-design-vue';
// import { useAuthStore } from "./auth.module";
// import UserService from '../services/user.service';

// export const useMyStore = defineStore('myStore', {
//   state: () => ({
//     places: [],
//     placesChild: [],
//     placesSubChild: [],
//     districts: [],
//     vicinities: [],
//     regions: [],
//     localities: [],
//     highways: [],
//     userData: {},
//   }),

//   actions: {
//     async fetchPlaces() {
//       try {
//         const response = await axios.get('/place/?test=1');
        
//         if (response.status === 200) {
//           this.places = response.data.data;
//         } else {
//           console.error('Error fetching data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     },
//     async fetchPlacesChild(param) {
//       try {
//         const response = await axios.get('/place/?code=' + param);
//         if (response.status === 200) {
//           this.placesChild = response.data.data;

//         } else {
//           console.error('Error fetching data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     },
//     async fetchPlacesSubChild(code, id) {
//       try {
//         const response = await axios.get('/place/fields/?code=' + code + '&id=' + id);
//         if (response.status === 200) {
//           this.placesSubChild = response.data.data.fields;
//         } else {
//           console.error('Error fetching data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     },
//     async addNewPlaceChild(data) {
//       try {
//         const response = await axios.post('/places/save/', data);
//         if (response.status === 200) {
//           console.log(response.data);
//           message.success('Успешно изменено');
//         } else {
//           console.error('Error fetching data:', response.statusText);
//           message.error('Ошибка');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     },
//     async getMe() {
//       try {
//         const response = await UserService.getMe();
//         console.log('respo user:', response.data.data);  
//         this.userData = response.data.data;
//         return response;
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     },

//   },

//   modules: {
//     useAuthStore,
//   }
// });