import React, { useEffect, useState } from 'react';
import DistNav from './DistNav';
import { Link } from 'react-router-dom';
import "../css/rentalclients.css"

const RentalClients = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:4000/get-cars', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setCars(data.cars);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); 

  console.log(cars);

  return (
    <div className='main--div--rental'>
      <DistNav />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='rentalclients'>
        <Link to='/add-car' className='add-car-link'>Add Clients</Link>
        <h2 className='clienth1'>Rental Clients</h2>
        <hr className='line12'></hr>
        <div className='clientdiv' >
          {cars.length > 0 ? (
            cars.map((item, index) => (
              <div key={index} className='client-item'>
                <div className="client-info">
                  <img src={`http://localhost:4000/${item.carPhoto}`} alt='Car' className='car-image'  style={{width:"400px"}}/>
                  <div className="client-details">
                    <h1 className='detail-detial'>Owner Detail:</h1>
                    <div className="owner">
                    <p>Verified !</p>
                    <p className='client-name'>Owner: {item.ownerName}</p>
                    <p className='client-phone'>Phone: {item.ownerPhone}</p>
                    </div>
                    <h1 className='detail-detial'>Vehicle Detail:</h1>
                    <div className="vehicle-client">
                    <p className='car-brand'>Brand: {item.carBrand}</p>
                    <p className='car-type'>Vehicle: {item.carType}</p>
                    <p className='car-number'>Vehicle No.: {item.carNumber}</p>
                    </div>
                    <h1 className='detail-detial'>Driver Detail:</h1>
                    <div className="driver">
                    <p className='driver-name'>Driver Name: {item.driverName}</p>
                    <p className='driver-phone'>Phone: {item.driverPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No rental clients found, please try again !!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalClients;
