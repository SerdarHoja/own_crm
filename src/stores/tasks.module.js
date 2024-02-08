import { defineStore } from 'pinia';
import TasksService from '../services/tasks.service.js';
import { message } from 'ant-design-vue';

export const useTasksStore = defineStore('task', {
  state: () => ({
    tasksDataObj: [],
    filterData: [],
  }),
  actions: {
    async getTasks() {
      try {
        const response = await TasksService.getTasks();
        this.tasksDataObj = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getTasksFilter() {
      try {
        const response = await TasksService.getTasksFilter();
        this.filterData = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
});
