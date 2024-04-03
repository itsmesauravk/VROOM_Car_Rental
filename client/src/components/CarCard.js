// CarCard.js
import React, { useContext } from 'react';
import "../css/carcard.css";
import { Carlist } from '../Datas';
import { Link } from "react-router-dom";
import { CityContext } from './CityContext';

const CarCard = () => {
  const { selectedCity } = useContext(CityContext);

  const filteredCars = Carlist.filter((car) => {
    if (selectedCity === '--None--') return true;
    return car.city === selectedCity;
  });

  return (
    <div className='carcard'>
      {filteredCars.map((car, index) => {
        const { id, title, img, price, Model, Mode, Rating, city } = car;
        return (
          <div key={index} className="card">
            <img src={img} alt={title} className='car-img-card'></img>
            <div className="car-detail">
              <h2 className="car-name" >{title}</h2>
            </div>
            <p className='car-price'>{price}</p>
            <p className='car-city'>{city}</p>
            <div className='car-second-details'>
              <Link to={`/cars/${id}`} className='Link-view'>
                <button className='view-details'>View Details</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarCard;
