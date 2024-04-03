import React, { createContext, useContext, useState } from 'react';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('--None--');

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity}}>
      {children}
    </CityContext.Provider>
  );
};

