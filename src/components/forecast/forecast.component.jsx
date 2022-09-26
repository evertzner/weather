import React from "react";
import { useStoreState } from "easy-peasy";

const Forecast = () => {
  const weatherForecast = useStoreState((state) => state.weatherForecast);

  console.log("weatherForecast", weatherForecast);

  return <div></div>;
};

export default Forecast;
