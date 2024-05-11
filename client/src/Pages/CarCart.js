import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../css/CarCart.css'; // Assuming you have a CSS file named CarCart.css for styling
import { useParams } from 'react-router-dom';

const CarCart = () => {
  const Rentaldetails = {
    VehicleImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fHww",
    OwnerName: "Nischal Dai",
    OwnerPhone: "908848845",
    Brand: "BMW",
    Vehicle: "Sedan",
    VehicleNo: "098-672",
    DriverImage: "https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg?w=400&h=300&c=crop",
    DriverName: "Saurav Vai",
    DriverPhone: "2313522321"
  };

  const [rentaldetails, setRentaldetails] = useState([]); 
  const {userId} = useParams();

// for fetching the data from the backend about the booked car details

const showRequest = async () => {
  try {
    const response = await fetch(`http://localhost:4000/show-user-request-status/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    if (result.success === true && result.data.carId !== null) {
      setRentaldetails(result.data);
    }

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    showRequest();
  }
}, []);

console.log(rentaldetails);

  return (
    <>
      <Nav />
      <div className='CarCart'>
        <div className="owner-vehicle-details">
          <div className="owner-details">
            <h2>Owner Details</h2>
            <div className="detail">
              <img src={Rentaldetails.VehicleImage} alt="Vehicle" className="vehicle-image" />
              <p><strong>Owner Name:</strong> {Rentaldetails.OwnerName}</p>
              <p><strong>Owner Phone:</strong> {Rentaldetails.OwnerPhone}</p>
              <p><strong>Brand:</strong> {Rentaldetails.Brand}</p>
              <p><strong>Vehicle:</strong> {Rentaldetails.Vehicle}</p>
              <p><strong>Vehicle No:</strong> {Rentaldetails.VehicleNo}</p>
            </div>
          </div>
        </div>

        <div className="driver-details">
          <div className="driver-image">
            <img src={Rentaldetails.DriverImage} alt="Driver" className="round-image" />
          </div>
          <div className="detail">
            <h2>Driver Details</h2>
            <p><strong>Driver Name:</strong> {Rentaldetails.DriverName}</p>
            <p><strong>Driver Phone:</strong> {Rentaldetails.DriverPhone}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarCart;
