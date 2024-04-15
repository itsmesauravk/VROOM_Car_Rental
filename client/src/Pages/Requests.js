import React, { useContext } from 'react';
import Nav from "../components/Nav";
import { CityContext } from '../components/CityContext';
import "../css/request.css";
import { IoCarSport } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const Requests = () => {
  const { rentedVehicles } = useContext(CityContext);

  return (
    <div>
      <Nav/>
      <h1 className='req-title'>Request History</h1>
      <hr className='req--line'></hr>
      <div className='rented-vehicles'>
        <ul>
          {rentedVehicles?.map((request, index) => (
            <div className="rented-list" key={index}>
              <div className='req-box'>
              <p>Req Id:</p>
              <h1 className='req-num'>#{index+1}</h1>
              </div>
              <div className='req-vehicle-box'>
              <p><IoCarSport className="car-icon"/> Vehicle</p>
              <h1>{request.vehicle}</h1>
              </div>
              <div  className='req-vehicle-box'>
              <p><IoLocation className="car-icon"/> City</p>
              <h1>{request.city}</h1>
              </div>
              <div className="req-vehicle-box">
              <p><FaCalendar className="car-icon"/> From</p>
              <h1>{request.sDate}</h1>
              </div>
              <div className="req-vehicle-box">
              <p><FaCalendarAlt className="car-icon"/> To</p>
              <h1>{request.eDate}</h1> 
              </div>
              <div className='status'>
                <div className='pending-status'></div>
                <p>{request.status}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
