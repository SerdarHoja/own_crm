import { defineStore } from 'pinia';
import HeaderDataService from '../services/headerData.service';

export const useHeaderDataStore = defineStore('headerData', {
    state: () => ({
        me: {}
    }),
    actions: {
        async getMe() {
            try {
                const response = await HeaderDataService.getMe();
                console.log({response});
                this.me = response.data.data;
                return response;
            } catch (error) {
                return Promise.reject(error);
            }
        },
    },
});
