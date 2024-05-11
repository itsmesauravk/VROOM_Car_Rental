import React, { useContext, useEffect, useState,useRef } from 'react';
import "../css/selectcars.css";
import { SelectCarContext } from './SelectCarContext';
import { IoMdClose } from "react-icons/io";

const SelectCars = (props) => {
    const { handleSelectCar } = useContext(SelectCarContext);
    const [carsList, setCarsList] = useState([]); // Initialize with empty array
    // const [selectedCar,setSelectedCar]=useState()

    const selectcarRef =useRef(null)

        useEffect(()=>{
            const clicker = (e)=>{
            if(!selectcarRef.current || !selectcarRef.current.contains(e.target)){
                handleSelectCar();
            }
            }
    
            document.addEventListener("mousedown",clicker)
    
            return()=>{
                document.removeEventListener("mousedown",clicker)
            }
    
        },[])

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

    
    const handleCar=async(selectedCar)=>{
        const action = "accept";
        if((selectedCar.status)==="Booked"){
            alert("This car is already booked");
        }else{
        try {
            const response = await fetch(`http://localhost:4000/accept-reject-request/${props.requestId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {
                    action,
                    carId:selectedCar._id
                 }
            )
            });
            const result = await response.json();
            if (result.success === true) {
                alert("Request Accepted")
                handleSelectCar()
            }
            
      
          } catch (error) {
              console.log("error on rejecting request", error)
          }
        }
    }
useEffect(() => {
    getAllDistCars();
},[]);

return (
    <div className='selectcarsdiv' ref={selectcarRef}>
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
                  <h4>Price/day</h4>
                  <h4>Vehicle No.</h4>
                  <h4>Driver Name</h4>
                  <h4>Status</h4>
                </div>
                {carsList.map((car,index)=>{
                  return(
                    <div className='actual-details' key={car.carNumber} onClick={()=>handleCar(car)}>
                      <p>{index+1}</p>
                      <img src= {`http://localhost:4000/${car.carPhoto}`} alt='car-photo' className="car-detail-photo"></img>
                      <p>{car.carType}</p>
                      <strong><p>Rs {car.price}/-</p></strong>
                      <p>{car.carNumber}</p>
                      <p>{car.driverName}</p>
                      <p>{car.status}</p>
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
