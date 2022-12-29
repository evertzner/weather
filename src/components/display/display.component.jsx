import React from 'react';
import { useStoreState } from 'easy-peasy';
import './display.styles.scss';

const Display = () => {
  const currentCity = useStoreState((state) => state.currentCity);
  const weather = useStoreState((state) => state.weather);

  const { name: city } = currentCity;
  const { main: weatherMain } = weather;
  const weatherIcon = weather.weather[0];

  return (
    <div className="display">
      <div className="display__city">{city}</div>
      <div className="display__temperature">{Math.round(weatherMain.temp)}º</div>
      <img
        className="display__icon"
        alt={weatherIcon.description}
        src={`http://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`}
      />
      <div className="display__footer">
        <div className="display__footer__max-min">
          {Math.round(weatherMain.temp_max)}º / {Math.round(weatherMain.temp_min)}º
        </div>
        <div className="display__footer__feels-like">
          Feels like {Math.round(weatherMain.feels_like)}º
        </div>
      </div>
    </div>
  );
};

export default Display;
