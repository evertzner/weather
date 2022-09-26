import { action, thunk } from "easy-peasy";
import axios from "axios";

const StoreModel = {
  currentCity: {},
  weather: {},
  weatherForecast: {},
  cities: [],
  // Thunks
  getCurrentCity: thunk(async (actions) => {
    const options = {
      method: "GET",
      url: "https://spott.p.rapidapi.com/places/ip/me",
      headers: {
        "X-RapidAPI-Key": "e50df66fc4msh37d4c40d3aeadaap17a797jsne30f67d01585",
        "X-RapidAPI-Host": "spott.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);

    if (!response) {
      throw new Error();
    }

    const { data } = response;
    actions.setCurrentCity(data);

    getWeather(actions, data);
    getWeatherForecast(actions, data);
  }),
  getCities: thunk(async (actions, city) => {
    if (city === "") {
      actions.setCities([]);
      return;
    }
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        limit: "10",
        namePrefix: city,
        sort: "+name",
        languageCode: "en",
        types: "CITY",
      },
      headers: {
        "X-RapidAPI-Key": "e50df66fc4msh37d4c40d3aeadaap17a797jsne30f67d01585",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    if (!response) {
      throw new Error();
    }

    const { data } = response;
    actions.setCities(data);
  }),
  setSelectedCity: thunk(async (actions, city) => {
    actions.setCurrentCity(city);

    const data = {
      coordinates: { latitude: city.latitude, longitude: city.longitude },
    };
    getWeather(actions, data);
    getWeatherForecast(actions, data);
  }),
  // Actions
  setCurrentCity: action((state, currentCity) => {
    state.currentCity = currentCity;
  }),
  setWeather: action((state, weather) => {
    state.weather = weather;
  }),
  setForecast: action((state, weatherForecast) => {
    state.weatherForecast = weatherForecast;
  }),
  setCities: action((state, cities) => {
    state.cities = cities;
  }),
};

export default StoreModel;

const getWeather = async (actions, city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&units=metric&appid=739c38980e42994dcda91a12e651d06f`
  );
  if (!response) {
    throw new Error();
  }

  const { data } = response;
  actions.setWeather(data);
};

const getWeatherForecast = async (actions, city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coordinates.latitude}&lon=${city.coordinates.longitude}&units=metric&appid=739c38980e42994dcda91a12e651d06f`
  );
  if (!response) {
    throw new Error();
  }

  const { data } = response;
  actions.setForecast(data);
};
