// FilterCar.js
import React, { useContext, useState } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { CityList, VehicleList } from '../Datas';
import { CityContext } from '../components/CityContext';
import '../css/filtercar.css';

const FilterCar = () => {
  const { selectedCity, setSelectedCity, selectedVehicle, setSelectedVehicle } = useContext(CityContext);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);

  const handleCity = city => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  const handleVehicle = vehicle => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false);
  };

  return (
    <div className="filter-car">
      <div className="dropdown">
        <div className="dropdown-btn" onClick={() => setIsCityOpen(!isCityOpen)}>
          <div className="selection">
            <div className="daysp">Select your city</div>
            <div className="days">{selectedCity === '--None--' ? '--None--' : selectedCity}</div>
          </div>
          {isCityOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
        </div>
        {isCityOpen && (
          <div className="dropdown-menu">
            {CityList.map((city, index) => (
              <div key={index} className="dropdown--li city-item" onClick={() => handleCity(city)}>
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="dropdown">
        <div className="dropdown-btn" onClick={() => setIsVehicleOpen(!isVehicleOpen)}>
          <div className="selection">
            <div className="daysp">Select your Vehicle</div>
            <div className="days">{selectedVehicle === '--None--' ? '--None--' : selectedVehicle}</div>
          </div>
          {isVehicleOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
        </div>
        {isVehicleOpen && (
          <div className="dropdown-menu">
            {VehicleList.map((vehicle, index) => (
              <div key={index} className="dropdown--li vehicle-item" onClick={() => handleVehicle(vehicle)}>
                {vehicle}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterCar;
