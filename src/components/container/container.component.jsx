import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Display from '../display/display.component';
import Forecast from '../forecast/forecast.component';
import Cities from '../cities/cities.component';
import DayProjection from '../day-projection/day-projection.component';

import './container.styles.scss';

const Container = () => {
  const getCurrentCity = useStoreActions((actions) => actions.getCurrentCity);
  const weather = useStoreState((state) => state.weather);
  const weatherForecast = useStoreState((state) => state.weatherForecast);

  useEffect(() => {
    getCurrentCity();
  }, [getCurrentCity]);

  return (
    <div className="container">
      <Cities />
      {Object.keys(weather).length === 0 || <Display />}
      {Object.keys(weatherForecast).length === 0 || <DayProjection />}
      {Object.keys(weatherForecast).length === 0 || <Forecast />}
    </div>
  );
};

export default Container;
