import React from 'react';
import { useParams } from 'react-router-dom';
import { Carlist } from '../Datas';
import { FaDollarSign, FaMapMarkerAlt, FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import required icons
import '../css/SingleCar.css';
import Nav from "../components/Nav"

const SingleCar = () => {
  const { id } = useParams();
  const carId = parseInt(id);

  const car = Carlist.find((car) => car.id === carId);

  const { title, img, price, Model, Mode, Rating, city } = car;

  return (
    <>
      <Nav />
      <div className="single-car-container">
        <div className="single-car-details">
          <h2>{title}</h2>
          <p><FaDollarSign /> Price: {price}</p>
          <p>Model: {Model}</p>
          <p>Rating: {Rating}</p>
          <p><FaMapMarkerAlt /> City: {city}</p>
        </div>
        <div className="single-car-image">
          <img src={img} alt={title} />
        </div>
      </div>
    </>
  );
};

export default SingleCar;
