import React, { useContext, useEffect, useState } from 'react';
import Nav from "../components/Nav";
import { CityContext } from '../components/CityContext';
import "../css/request.css";
import { IoCarSport } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const Requests = () => {
  const { rentedVehicles } = useContext(CityContext);
  const [userRequest, setUserRequest] = useState([])

  const token = localStorage.getItem('token');

  const showRequest = async () => {
    try {
      
      const response = await fetch(`http://localhost:4000/show-request`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      if(result.success === true){
        setUserRequest(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(token){
      showRequest()
    }
  }, [token])

  console.log("UserRequests : ",userRequest)

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
      {/* test  */}
      <div>
        {userRequest.map((request, index) => (
          <div key={index} style={{marginTop:"2rem"}}>
            <h1>{request.senderUser.fullname}</h1>
            <h1>{request.receiverDistributor.fullname}</h1>
            <h1>{request.receiverDistributor.address}</h1>

            <h1>{request.bookingDetails.vehicle}</h1>
            <h1>{request.bookingDetails.startDate}</h1>
            <h1>{request.bookingDetails.endDate}</h1>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Requests;
