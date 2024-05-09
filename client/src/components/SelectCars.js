import React, { useContext, useEffect } from 'react'
import "../css/selectcars.css"
import { SelectCarContext } from './SelectCarContext'

const SelectCars = () => {
    const {handleSelectCar}=useContext(SelectCarContext)

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
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    

    useEffect(() => {
      getAllDistCars();
    }, [])

  return (
    <div className='selectcarsdiv'>
      This is select cars.
      <button onClick={handleSelectCar}>Close</button>
    </div>
  )
}

export default SelectCars
