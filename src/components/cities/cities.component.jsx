import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import './cities.styles.scss';

const Cities = () => {
  const getCities = useStoreActions((actions) => actions.getCities);
  const setSelectedCity = useStoreActions((actions) => actions.setSelectedCity);
  const cities = useStoreState((state) => state.cities);
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(null);

  const searchCity = (e) => {
    setInputValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      getCities(e.target.value);
    }, 1000);

    setTimer(newTimer);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setInputValue('');
    getCities('');
  };

  return (
    <div className="cities">
      <input
        className="cities__search"
        value={inputValue}
        type="text"
        onChange={searchCity}
        placeholder="Search city"
      />
      {cities.data && (
        <div className="cities__list">
          {cities.data.map((c) => (
            <div className="cities__list__city" key={c.id} onClick={() => selectCity(c)}>
              {c.name}, {c.region}, {c.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cities;
