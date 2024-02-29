import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://crm.web-hands.ru/api/v1";

class ObjectsService {
  getObjects(section) {
    return axios.get(API_URL + "/objects/list/?section=" + section, {
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

  getObjectsFilter(param) {
    return axios.get(API_URL + '/objects/list/?section=country&' + param, { headers: authHeader() });
  }
}

export default new ObjectsService();
