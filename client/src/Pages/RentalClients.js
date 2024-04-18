import React, { useEffect, useState } from 'react';
import DistNav from './DistNav';

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
    <div style={{display:"flex", gap:"3rem"}}>
      <DistNav />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='rentalclients'>
        <h2 className='clienth1'>Rental Clients</h2>
        <hr className='line1'></hr>
        <div className='clientdiv' >
          {cars.length > 0 ? (
            cars.map((item, index) => (
              <div key={index} className='client-item' style={{border:"2px solid black", padding:"5px", marginTop:"15px"}}>
                <div className="client-info">
                  <img src={`http://localhost:4000/${item.carPhoto}`} alt='Car' className='car-image'  style={{width:"400px"}}/>
                  <div className="client-details">
                    <p className='client-name'>Owner: {item.ownerName}</p>
                    <p className='client-phone'>Phone: {item.ownerPhone}</p>
                    <p className='car-brand'>Car Brand: {item.carBrand}</p>
                    <p className='car-type'>Car Type: {item.carType}</p>
                    <p className='car-number'>Car Number: {item.carNumber}</p>
                    <p className='driver-name'>Driver Name: {item.driverName}</p>
                    <p className='driver-phone'>Driver Phone: {item.driverPhone}</p>
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
