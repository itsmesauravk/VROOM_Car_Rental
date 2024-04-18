import React, { useState } from 'react';

const AddCars = () => {
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

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Cars</h1>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <form onSubmit={addCarHandler} encType="multipart/form-data">
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='ownerName'>Owner Name:</label>
            <input type='text' id='ownerName' name='ownerName' value={formData.ownerName} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='ownerPhone'>Owner Phone:</label>
            <input type='text' id='ownerPhone' name='ownerPhone' value={formData.ownerPhone} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='carBrand'>Car Brand:</label>
            <input type='text' id='carBrand' name='carBrand' value={formData.carBrand} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='carType'>Car Type:</label>
            <input type='text' id='carType' name='carType' value={formData.carType} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='carPhoto'>Car Photo:</label>
            <input type='file' id='carPhoto' name='carPhoto' onChange={handlePhotoChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='carNumber'>Car Number:</label>
            <input type='text' id='carNumber' name='carNumber' value={formData.carNumber} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='driverName'>Driver Name:</label>
            <input type='text' id='driverName' name='driverName' value={formData.driverName} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='driverPhone'>Driver Phone:</label>
            <input type='text' id='driverPhone' name='driverPhone' value={formData.driverPhone} onChange={handleChange} required />
          </div>
          <button type='submit'>Add Car</button>
        </form>
      </div>
    </div>
  );
};

export default AddCars;
