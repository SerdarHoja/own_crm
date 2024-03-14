import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://crm.web-hands.ru/api/v1";

class ObjectsService {
  getObjects(section, type = '') {
    if(type)
    type = type === '1' ? '&filter%5Bresp_broker%5D=my' : '';
    console.log(type, 'cdsvxc')
    return axios.get(API_URL + "/objects/list/?section=" + section + type, {
      headers: authHeader(),
    });
  }

  getObjectBrief(section, id) {
    return axios.get(
      API_URL + "/objects/brief/?section=" + section + "&id=" + id,
      { headers: authHeader() }
    );
  }

  getObjectFields(section, id) {
    return axios.get(
      API_URL + "/objects/fields/?section=" + section + "&id=" + id,
      { headers: authHeader() }
    );
  }

  updateObject(data) {
    const fd = new FormData();
    if(data.id && data.id !== undefined)
      fd.append("id", data.id);
    fd.append("section", data.section);
    for (const [key, value] of Object.entries(data.fields)) {
      fd.append(`fields[${key}]`, value);
    }
    for (const [key, value] of Object.entries(data.stages)) {
      fd.append(`stages[${key}]`, JSON.stringify(value));
    }
    const url = `${API_URL}/objects/save/`;

    // Do not set 'Content-Type' header when using FormData
    const headers = {
      ...authHeader(),
      'Content-Type': 'application/json',
    };

    return axios
      .post(url,  fd, { headers })
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        throw error; // Propagate the error further if needed
      });
  }

  updateObjectTEST(data) {
    const fd = new FormData();
    if(data.id && data.id !== undefined)
      fd.append("id", data.id);
    fd.append("section", data.section);
    for (const [key, value] of Object.entries(data.fields)) {
      fd.append(`fields[${key}]`, value);
    }
    // for (const [key, value] of Object.entries(data.stages)) {
    //   fd.append(`stages[${key}]`, JSON.stringify(value));
    // }
    const url = `${API_URL}/objects/save/`;

    // Do not set 'Content-Type' header when using FormData
    const headers = {
      ...authHeader(),
      'Content-Type': 'application/json',
    };
    return axios
      .post(url,  fd, { headers })
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        throw error; // Propagate the error further if needed
      });
  }

  getComments(id) {
    return axios.get(API_URL + "/objectcomments/list/?id=" + id, {
      headers: authHeader(),
    });
  }

  deleteComment(data) {
    return axios.post(API_URL + "/objectcomments/delete/", data, {
      headers: authHeader(),
    });
  }

  addComment(data) {
    return axios.post(API_URL + "/objectcomments/add/", data, {
      headers: authHeader(),
    });
  }
  
  updateCheckboxValue(id, isChecked) {
    const data = {
      id: id,
      isChecked: isChecked,
    };

    return axios.put(API_URL + "/objects/updateCheckbox/", data, {
        headers:authHeader(),
    });
  }

  getStagesOptions(entity, prop) {
    return axios.get(API_URL + "/stages/list/?entity=" + entity + "&prop=" + prop, {
      headers: authHeader(),
    });
  }
   getOptionData(code, id, entity) {
        return axios.get(API_URL + '/options/list/?prop=' + code + '&id=' + id + '&entity=' + entity, { headers: authHeader() });
  }
  // Получение данных по фильтрам
  getObjectsFilter(section, param, type = '') {
    type = type === '1' ? '&filter%5Bresp_broker%5D=my' : '';
    return axios.get(API_URL + `/objects/list/?section=${section}&` + param + type, { headers: authHeader() });
  }
  // Получение объекта по id
  getObjectByID(section, id) {
    return axios.get(API_URL + `/objects/list/?section=${section}&filter%5Bid%5D=${id}`, { headers: authHeader() });
  }

  getVillageData(id) {
    return axios.get(API_URL + `/objects/fieldsvillage/?id=${id}`, { headers: authHeader() });
  }

  getFieldsForNewObject(section) {
    return axios.get(API_URL + `/objects/field/?section=${section}&code=object_view`, { headers: authHeader() });
  }

  getFieldsObject(section, id) {
    return axios.get(API_URL + `/objects/fields/?section=${section}&id=${id}`, { headers: authHeader() });
  }

  getObjectPhotos(id) {
    return axios.get(API_URL + `/objectsphoto/list/?id=${id}`, { headers: authHeader() });
  }

  setPhotoAsMain(data) {
    return axios.post(API_URL + `/objectsphoto/setmain/`, data, { headers: authHeader() });
  }

  setPhotoPlan(data) {
    return axios.post(API_URL + `/objectsphoto/setmain/`, data, { headers: authHeader() });
  }

  uploadNewPhoto(data) {
    return axios.post(API_URL + `/objectsphoto/add/`, data, { headers: authHeader() });
  }
  
  listByOwner(id) {
    return axios.get(API_URL + `/objects/listbyowner/?owner=${id}`, { headers: authHeader() });
  }
}

export default new ObjectsService();
