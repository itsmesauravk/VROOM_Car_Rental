// FilterCar.js
import React, { useContext, useState } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { Carlist } from '../Datas';
import {CityContext} from "../components/CityContext"
import "../css/filtercar.css";

const FilterCar = () => {
  const { selectedCity, setSelectedCity} = useContext(CityContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  return (
    <div className="filter-car">
      <div className="dropdown">
        <div className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          <div>
            <div className="days">{selectedCity === '--None--' ? '--None--' : selectedCity}</div>
            <div className="daysp">Select your city</div>
          </div>
          {isOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            {['--None--', ...new Set(Carlist.map((car) => car.city))].map((city, index) => (
              <div
                key={index}
                className="dropdown--li"
                onClick={() => handleCityChange(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterCar;
