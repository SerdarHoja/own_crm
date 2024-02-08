import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://crm.web-hands.ru/api/v1';

class TasksService {
  getTasks() {
    return axios.get(API_URL + '/tasks/list/', { headers: authHeader() });
  }
  getTasksFilter() {
    return axios.get(API_URL + '/filter/list/?entity=tasks', { headers: authHeader() });
  }
  getTaskData(param) {
    return axios.get(API_URL + '/tasks/data/?id=' + param, { headers: authHeader() });
  }

  createNewTask(data) {
    return axios.post(API_URL + '/tasks/save/', data, { headers: authHeader() });
  }

  deleteTask(data) {
    return axios.post(API_URL + '/tasks/delete/', data, { headers: authHeader() });
  }
  getClientFields() {
    return axios.get(API_URL + '/clients/fields/', { headers: authHeader() });
  }
}

export default new TasksService();