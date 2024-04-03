import React, { useState } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine, RiSearchLine } from 'react-icons/ri';
import { AiFillClockCircle } from 'react-icons/ai';
import { Carlist } from '../Datas';

const FilterCar = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  const filteredCars = Carlist.filter((car) => {
    if (selectedCity === 'All') return true;
    return car.city === selectedCity;
  }).filter((car) => car.name?.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          <AiFillClockCircle className="mappinline" />
          <div>
            <div className="days">{selectedCity === 'All' ? 'All Cars' : selectedCity}</div>
            <div className="daysp">Select your city</div>
          </div>
          {isOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            {['All', ...new Set(Carlist.map((car) => car.city))].map((city, index) => (
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
      <div>
        {filteredCars.map((car) => (
          <div key={car.id}>{car.name} - {car.city}</div>
        ))}
      </div>
      <div className="search-container">
              <RiSearchLine className="search-icon" onClick={() => setSelectedCity('All')} />
            </div>
    </>
  );
};

export default FilterCar;
