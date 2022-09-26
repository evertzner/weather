import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Display from "../display/display.component";
import Forecast from "../forecast/forecast.component";
import Cities from "../cities/cities.component";

const Container = () => {
  const getCurrentCity = useStoreActions((actions) => actions.getCurrentCity);
  const currentCity = useStoreState((state) => state.currentCity);

  //const getWeather = useStoreActions((actions) => actions.getWeather);

  useEffect(() => {
    getCurrentCity();
  }, [getCurrentCity]);

  console.log("currentCity", currentCity);

  return (
    <div>
      <Display />
      <Forecast />
      <Cities />
    </div>
  );
};

export default Container;
