import React, { useContext, useEffect, useState } from 'react';
import Nav from "../components/Nav";
import { CityContext } from '../components/CityContext';
import "../css/request.css";
import { IoCarSport } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const Requests = () => {
  const { rentedVehicles } = useContext(CityContext);
  const token = localStorage.getItem('token');
  const {userId} = useParams()
  const [userRequestStatus, setUserRequestStatus] = useState([]);
  
  
  const showRequestedVehicles = async () => { 
    try {
      const response = await fetch(`http://localhost:4000/show-user-request-status/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      if(data.success){
        setUserRequestStatus(data.data)
      }
    } catch (error) {
      console.log("Users error", error);
    }
  }
  useEffect(() => {
    if(token){
      showRequestedVehicles();
    }
  }, []);
 
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
        {userRequestStatus.map((request, index) => (
          <div key={index} style={{marginTop:"0.3rem" , border:"1px solid black"}}>
            <h2>{request.senderUser.fullname}</h2>
            <h2>{request.receiverDistributor.fullname}</h2>
            <h4>{request.receiverDistributor.address}</h4>

            <h4>{request.bookingDetails.vehicle}</h4>
            <h4>{request.bookingDetails.startDate}</h4>
            <h4>{request.bookingDetails.endDate}</h4>
            <h2>{request.status}</h2>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Requests;
