import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Cities = () => {
  const getCities = useStoreActions((actions) => actions.getCities);
  const setSelectedCity = useStoreActions((actions) => actions.setSelectedCity);
  const cities = useStoreState((state) => state.cities);
  const [inputValue, setInputValue] = useState("");
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
    console.log("Selected City", city);
  };

  return (
    <>
      <input value={inputValue} type="text" onChange={searchCity} />
      {cities.data &&
        cities.data.map((c) => (
          <div key={c.id} onClick={() => selectCity(c)}>
            {c.name}, {c.region}, {c.country}
          </div>
        ))}
    </>
  );
};

export default Cities;
