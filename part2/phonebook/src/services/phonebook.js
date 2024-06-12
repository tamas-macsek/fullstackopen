import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const add = (person) => {
  return axios.post(`${baseUrl}`, person).then((r) => r.data);
};

const edit = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  add,
  edit,
  remove,
};
