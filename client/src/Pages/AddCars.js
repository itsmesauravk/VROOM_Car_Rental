import React, { useState } from 'react';
import '../css/addcars.css';
import { Link,useParams } from 'react-router-dom';

const AddCars = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    carBrand: '',
    carType: '',
    carPhoto: null,
    carNumber: '',
    driverName: '',
    driverPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      carPhoto: e.target.files[0],
    }));
  };

  const addCarHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('ownerName', formData.ownerName);
    formDataToSend.append('ownerPhone', formData.ownerPhone);
    formDataToSend.append('carBrand', formData.carBrand);
    formDataToSend.append('carType', formData.carType);
    formDataToSend.append('carPhoto', formData.carPhoto);
    formDataToSend.append('carNumber', formData.carNumber);
    formDataToSend.append('driverName', formData.driverName);
    formDataToSend.append('driverPhone', formData.driverPhone);

    const response = await fetch('http://localhost:4000/add-car', {
      method: 'POST',
      body: formDataToSend,
    });
    const data = await response.json();
    if (data.success) {
      console.log('Car added successfully');
      // Reset form data after successful submission
     
    } else {
      console.log('Car not added');
    }
  };

  return (<>
  <div className='main-div-rental'>
     <button className="rental-back">
    <Link to={`/rental_clients/${id}`}className='link-rental' >
              Back to Clients
            </Link>
  </button>
    <div className="form-container">
      <h1>Add Clients</h1>
      <div className="form-wrapper">
        <form onSubmit={addCarHandler} encType="multipart/form-data">
            <h2>Owner details:</h2>
            <hr className='owner-line'></hr>
          <div className="owner-details">
            <div className="form-group">
              <label htmlFor='ownerName'>Name of the owner:</label>
              <input type='text' id='ownerName' name='ownerName' value={formData.ownerName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor='ownerPhone'>Owner Phone:</label>
              <input type='text' id='ownerPhone' name='ownerPhone' value={formData.ownerPhone} onChange={handleChange} required />
            </div>
          </div>
           <h2>Vehicle details:</h2>
            <hr className='owner-line'></hr>
          <div className="owner-details"></div>
          <div className="car-details">
            <div className="form-group">
              <label htmlFor='carBrand'>Brand:</label>
              <input type='text' id='carBrand' name='carBrand' value={formData.carBrand} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor='carType'>Vehicle:</label>
              <input type='text' id='carType' name='carType' value={formData.carType} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor='carPhoto'>Vehicle Image:</label>
              <input type='file' id='carPhoto' name='carPhoto' onChange={handlePhotoChange} required />
            </div>
            <div className="form-group">
              <label htmlFor='carNumber'>Vehicle Number:</label>
              <input type='text' id='carNumber' name='carNumber' value={formData.carNumber} onChange={handleChange} required />
            </div>
          </div>
           <h2>Driver details:</h2>
            <hr className='owner-line'></hr>
          <div className="owner-details"></div>
          <div className="driver-details">
            <div className="form-group">
              <label htmlFor='driverName'>Name of Driver:</label>
              <input type='text' id='driverName' name='driverName' value={formData.driverName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor='driverPhone'>Driver Phone:</label>
              <input type='text' id='driverPhone' name='driverPhone' value={formData.driverPhone} onChange={handleChange} required />
            </div>
          </div>
          <button type='submit'>Add Car</button>
        </form>
      </div>
    </div>
  </div>
  </>
  );
};

export default AddCars;