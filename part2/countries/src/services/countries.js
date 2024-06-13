import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const owmBaseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then((r) => r.data);
};

const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then((r) => r.data);
};

const getWeather = (country) => {
  const OWM_KEY = import.meta.env.VITE_OWM_KEY;

  if (OWM_KEY === undefined) {
    return null;
  }

  const [lat, lon] = country.latlng;
  return axios
    .get(`${owmBaseUrl}units=metric&lat=${lat}&lon=${lon}&appid=${OWM_KEY}`)
    .then((r) => r.data);
};

export default {
  getAll,
  getByName,
  getWeather,
};
