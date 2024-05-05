import React, { useEffect, useState } from 'react';
import DistNav from './DistNav';
import { Link, useParams } from 'react-router-dom';
import "../css/rentalclients.css"

const RentalClients = () => {
  // State variables to manage car data, loading state, and errors
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  // Function to fetch car data from the server
  const fetchCars = async () => {
    try {
      const response = await fetch(`http://localhost:4000/get-cars-details/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (data.success) {
        // If successful response, update car data and loading state
        setCars(data.cars);
        setLoading(false);
      }
    } catch (error) {
      // If error occurs during fetch, update error state and loading state
      setError(error);
      setLoading(false);
    }
  };

  // useEffect hook to fetch car data when component mounts
  useEffect(() => {
    fetchCars();
  }, []); 

  // console.log(cars);

  return (
    <div className='main--div--rental'>
      {/* Navigation component */}
      <DistNav />
      {/* Display loading message if data is being fetched */}
      {loading && <p>Loading...</p>}
      {/* Display error message if there's an error */}
      {error && <p>Error: {error.message}</p>}
      <div className='rentalclients'>
        {/* Heading for rental clients */}
        <h2 className='clienth1'>Rental Clients</h2>
        {/* Horizontal line */}
        <hr className='line12'></hr>
        <div className='clientdiv' >
          {/* Conditional rendering based on car data availability */}
          {cars.length > 0 ? (
            // Map through car data and render client details
            cars.map((item, index) => (
              <div key={index} className='client-item'>
                <div className="client-info">
                  {/* Display car image */}
                  <img src={`http://localhost:4000/${item.carPhoto}`} alt='Car' className='car-image'  style={{width:"400px"}}/>
                  <div className="client-details">
                    {/* Owner details */}
                    <h1 className='detail-detial'>Owner Detail:</h1>
                    <div className="owner">
                      <p style={{backgroundColor:"#32CD32"}}>Verified !</p>
                      <p className='client-name'>Owner: {item.ownerName}</p>
                      <p className='client-phone'>Phone: {item.ownerPhone}</p>
                    </div>
                    {/* Vehicle details */}
                    <h1 className='detail-detial'>Vehicle Detail:</h1>
                    <div className="vehicle-client">
                      <p className='car-brand'>Brand: {item.carBrand}</p>
                      <p className='car-type'>Vehicle: {item.carType}</p>
                      <p className='car-number'>Vehicle No.: {item.carNumber}</p>
                    </div>
                    {/* Driver details */}
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
            // Display message if no rental clients found
            <p>No rental clients found, please try again !!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalClients;
