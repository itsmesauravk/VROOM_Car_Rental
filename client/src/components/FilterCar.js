import React, { useContext, useState ,useRef, useEffect} from 'react';
import { RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/ri';
import { CityList, VehicleList } from '../Datas';
import { CityContext } from '../components/CityContext';
import '../css/filtercar.css';
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import {format} from "date-fns"


const FilterCar = () => {
  const { selectedCity, setSelectedCity, selectedVehicle, setSelectedVehicle } = useContext(CityContext);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const cityRef=useRef();
  const vehicleRef=useRef();
  const [date,setDate]=useState({
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"
  })
  const [isDateOpen,setIsDateOpen]=useState(false);

  useEffect(()=>{
    const handler=(e)=>{
    if(!cityRef.current.contains(e.target)){
      setIsCityOpen(false)
    }
  }
    document.addEventListener("mousedown",handler)
    return()=>{
      document.removeEventListener("mousedown",handler)
    }
  })

  useEffect(()=>{
    const handler=(e)=>{
    if(!vehicleRef.current.contains(e.target)){
      setIsVehicleOpen(false)
    }
  }
    document.addEventListener("mousedown",handler)
    return()=>{
      document.removeEventListener("mousedown",handler)
    }
  })

  const handleCity = city => {
    setSelectedCity(city);
    setIsCityOpen(false);
  };

  const handleVehicle = vehicle => {
    setSelectedVehicle(vehicle);
    setIsVehicleOpen(false);
  };

  const handleChange=(ranges)=>{
    setDate(ranges.selection)
    console.log(setDate)
  }

  const dateToggle=()=>{
    setIsDateOpen(!isDateOpen)
  }
  return (
    <div className="filter-car">
      <div className='dropdown-image'>
          <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D" alt="dropdown-img" className='drop-img' />
      </div>
      <div className='two-dropdowns'>
        <div className='dropssss'>
        <div className="dropdown">
          <div className="dropdown-btn" onClick={() => setIsCityOpen(!isCityOpen)}>
            <div className="selection">
              <div className="daysp">Select your city</div>
              <div className="days">{selectedCity === '-None-' ? '-None-' : selectedCity}</div>
            </div>
            {isCityOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
          </div>
          <div className={`dropdown-menu ${isCityOpen ? 'open' : ''}`} ref={cityRef}>
            {CityList.map((city, index) => (
              <div key={index} className="dropdown--li city-item" onClick={() => handleCity(city)}>
                {city}
              </div>
            ))}
          </div>
        </div>
        <div className="dropdown1">
          <div className="dropdown-btn" onClick={() => setIsVehicleOpen(!isVehicleOpen)}>
            <div className="selection">
              <div className="daysp">Select your Vehicle</div>
              <div className="days">{selectedVehicle === '-None-' ? '-None-' : selectedVehicle}</div>
            </div>
            {isVehicleOpen ? <RiArrowDownSLine className="mappinline2" /> : <RiArrowUpSLine className="mappinline2" />}
          </div>
          <div className={`dropdown-menu ${isVehicleOpen ? 'open' : ''}`} ref={vehicleRef}>
            {VehicleList.map((vehicle, index) => (
              <div key={index} className="dropdown--li vehicle-item" onClick={() => handleVehicle(vehicle)}>
                {vehicle}
              </div>
            ))}
          </div>
        </div>
        </div>
        <div className='calendar'>
          <p>Select Date <span className='span-1' onClick={dateToggle}> Start and End Date</span> </p> 

          { isDateOpen && <DateRangePicker onChange={handleChange} ranges={[date]} className='main-calendar' minDate={new Date()}></DateRangePicker>}
        </div>
      </div>
    </div>
  );
};

export default FilterCar;
