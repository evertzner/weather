import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Cities = () => {
  const getCities = useStoreActions((actions) => actions.getCities);
  const cities = useStoreState((state) => state.cities);
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);

  const searchCity = (e) => {
    setInputValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      getCities(e.target.value);
    }, 500);

    setTimer(newTimer);
  };

  return (
    <>
      <input value={inputValue} type="text" onChange={searchCity} />
      {cities.data && cities.data.map((c) => <div key={c.id}>{c.name}</div>)}
    </>
  );
};

export default Cities;
