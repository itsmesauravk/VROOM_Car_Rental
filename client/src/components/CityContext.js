import React, { createContext,useState } from 'react';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('--None--');
  const [selectedVehicle,setSelectedVehicle]= useState("--None--")

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity,selectedVehicle,setSelectedVehicle}}>
      {children}
    </CityContext.Provider>
  );
};

