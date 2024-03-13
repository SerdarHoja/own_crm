import { defineStore } from 'pinia';
import FiltersService from '../services/filters.service';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filters: [],
  }),
  actions: {
    async getFiltersList(entity) {
      try {
        const response = await FiltersService.getFilters(entity);
        this.filters = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getObjectFiltersList(section) {
      try {
        const response = await FiltersService.getObjectFilters(section);
        this.filters = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
