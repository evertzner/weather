import React from "react";
import { useStoreState } from "easy-peasy";
import "./forecast.styles.scss";

const Forecast = () => {
  const weatherForecast = useStoreState((state) => state.weatherForecast);

  function getDayName(dayStr, locale, noon) {
    var date = new Date(dayStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  return (
    <div className="forecast">
      {weatherForecast.list.map((wf, index) => {
        if (wf.dt_txt.substr(-8, 5) === "12:00") {
          const weatherIcon = wf.weather[0];
          const { main: weatherMain } = wf;
          return (
            <div className="forecast__day" key={wf.dt}>
              <div className="forecast__day__time">
                {getDayName(wf.dt_txt, "en-US", index)}
              </div>
              <div className="forecast__day__pop">
                {Math.trunc(wf.pop * 100)}%
              </div>
              <img
                className="forecast__day__icon"
                alt={weatherIcon.description}
                src={`http://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`}
              ></img>
              <div className="forecast__day__max-min">
                {Math.ceil(weatherMain.temp_max)}º{" / "}
                {Math.floor(weatherMain.temp_min)}º
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Forecast;
