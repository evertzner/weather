import React from "react";
import { useStoreState } from "easy-peasy";

const Display = () => {
  const weather = useStoreState((state) => state.weather);

  console.log("weather", weather);

  return <div></div>;
};

export default Display;
