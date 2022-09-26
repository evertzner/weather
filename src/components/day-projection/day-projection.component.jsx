import React from "react";
import { useStoreState } from "easy-peasy";

import "./day-projection.styles.scss";

const DayProjection = () => {
  const weatherForecast = useStoreState((state) => state.weatherForecast);

  return (
    <div className="day-projection">
      {weatherForecast.list.map((wf, index) => {
        if (index <= 7) {
          const weatherIcon = wf.weather[0];
          const { main: weatherMain } = wf;
          return (
            <div key={wf.dt}>
              <div className="day-projection__time">
                {wf.dt_txt.substr(-8, 5)}
              </div>
              <img
                className="day-projection__icon"
                alt={weatherIcon.description}
                src={`http://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`}
              ></img>
              <div className="day-projection__temperature">
                {Math.round(weatherMain.temp)}º
              </div>
              <div className="day-projection__pop">{wf.pop * 100}%</div>
            </div>
          );
        }
        return <div key={wf.dt}></div>;
      })}
    </div>
  );
};

export default DayProjection;
