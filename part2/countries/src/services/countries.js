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
  console.log("getting weather");
  if (OWM_KEY === undefined) {
    console.log("returns null");
    return null;
  }
  console.log("configuring promise for weather");
  const [lat, lon] = country.latlng;
  //   return new Promise();
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       main: {
  //         temp: 25,
  //       },
  //     });
  //   });
  return axios
    .get(`${owmBaseUrl}units=metric&lat=${lat}&lon=${lon}&appid=${OWM_KEY}`)
    .then((r) => r.data);
};

export default {
  getAll,
  getByName,
  getWeather,
};
