import React, { useContext, useEffect, useState } from 'react';
import "../css/selectcars.css";
import { SelectCarContext } from './SelectCarContext';
import { IoMdClose } from "react-icons/io";

const SelectCars = ({requestId, action}) => {
    const { handleSelectCar } = useContext(SelectCarContext);
    const [carsList, setCarsList] = useState([]); // Initialize with empty array
    const [selectedCar,setSelectedCar]=useState()

    const token = localStorage.getItem('token');

    const getAllDistCars = async () => {
        try {
            const response = await fetch('http://localhost:4000/get-dist-cars', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            setCarsList(result.rentalClients);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCar=(selectedCar)=>{
        console.log(selectedCar._id)
        console.log(selectedCar.carNumber)
        console.log(selectedCar.carType)
        console.log(selectedCar.driverName)
    }
useEffect(() => {
    getAllDistCars();
}, []);

return (
    <div className='selectcarsdiv'>
        <div className='available-div'>
            <h1>Available Cars:</h1>
            <button onClick={handleSelectCar} className='select-car-button'>
                <IoMdClose className='cars-close'/>
            </button>
        </div>
        <div className='select-cars-list'>
            {carsList.length === 0 ? (
                <div>No cars available</div>
            ) : (
              <>
                <div className='list-details'>
                  <h4>S.N.</h4>
                  <h4>Car Image</h4>
                  <h4>Car Type</h4>
                  <h4>Vehicle No.</h4>
                  <h4>Driver Name</h4>
                </div>
                {carsList.map((car,index)=>{
                  return(
                    <div className='actual-details' key={car.carNumber} onClick={()=>handleCar(car)}>
                      <p>{index+1}</p>
                      <img src= {`http://localhost:4000/${car.carPhoto}`} alt='car-photo' className="car-detail-photo"></img>
                      <p>{car.carType}</p>
                      <p>{car.carNumber}</p>
                      <p>{car.driverName}</p>
                    </div>
                  )
                })}
                
              </>
            )}
        </div>
    </div>
);

};

export default SelectCars;
