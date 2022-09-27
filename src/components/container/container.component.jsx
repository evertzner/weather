import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Display from "../display/display.component";
import Forecast from "../forecast/forecast.component";
import Cities from "../cities/cities.component";
import DayProjection from "../day-projection/day-projection.component";

import "./container.styles.scss";

const Container = () => {
  const getCurrentCity = useStoreActions((actions) => actions.getCurrentCity);
  //const currentCity = useStoreState((state) => state.currentCity);
  const weather = useStoreState((state) => state.weather);
  const weatherForecast = useStoreState((state) => state.weatherForecast);

  //const getWeather = useStoreActions((actions) => actions.getWeather);

  useEffect(() => {
    getCurrentCity();
  }, [getCurrentCity]);

  console.log("weather", weather);

  return (
    <div className="container">
      {Object.keys(weather).length === 0 || <Display />}
      {Object.keys(weatherForecast).length === 0 || <DayProjection />}
      {Object.keys(weatherForecast).length === 0 || <Forecast />}
      <Cities />
    </div>
  );
};

export default Container;
