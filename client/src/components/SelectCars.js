import React, { useContext } from 'react'
import "../css/selectcars.css"
import { SelectCarContext } from './SelectCarContext'

const SelectCars = () => {
    const {handleSelectCar}=useContext(SelectCarContext)
  return (
    <div className='selectcarsdiv'>
      This is select cars.
      <button onClick={handleSelectCar}>Close</button>
    </div>
  )
}

export default SelectCars
