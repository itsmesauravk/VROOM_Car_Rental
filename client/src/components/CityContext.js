import React, { createContext,useState } from 'react';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('-None-');
  const [selectedVehicle,setSelectedVehicle]= useState("-None-")
  const [rentedVehicles,setRentedVehicles]=useState([]);

  const addrentedVehicle=(vehicle)=>{
    setRentedVehicles([...rentedVehicles,vehicle])
  }

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity,selectedVehicle,setSelectedVehicle,rentedVehicles,addrentedVehicle}}>
      {children}
    </CityContext.Provider>
  );
};

