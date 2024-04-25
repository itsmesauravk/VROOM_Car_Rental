import React, {useEffect, useState } from 'react';
import Nav from "../components/Nav";
import "../css/request.css";
import { IoCarSport } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const Requests = () => {
  const token = localStorage.getItem('token');
  const {userId} = useParams()
  const [userRequestStatus, setUserRequestStatus] = useState([]);
  
  // Function to fetch and display user's request history
  const showRequestedVehicles = async () => { 
    try {
      const response = await fetch(`http://localhost:4000/show-user-request-status/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Update state with user's request 
      if(data.success){
        setUserRequestStatus(data.data)
      }
    } catch (error) {
      console.log("Users error", error);
    }
  }
  
  
  const deleteRequest = async (requestId) => {
    console.log("Request ID", requestId);
  }
  // Fetch user's request history on component mount
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
      {userRequestStatus.length === 0 ? (
        <p className='no-history'>No request history to display.</p>
      ) : (
        <ul>
          {userRequestStatus.map((request, index) => (
            <div className="rented-list" key={index}>
              {/* Request ID */}
              <div className='req-box'>
                <p>Req Id:</p>
                <h1 className='req-num'>#{index+1}</h1>
              </div>
              {/* Vehicle */}
              <div className='req-vehicle-box'>
                <p><IoCarSport className="car-icon"/> Vehicle</p>
                <h1>{request.bookingDetails.vehicle}</h1>
              </div>
              {/* City */}
              <div  className='req-vehicle-box'>
                <p><IoLocation className="car-icon"/> City</p>
                <h1>{request.receiverDistributor.distributionLocation}</h1>
              </div>
              {/* Start Date */}
              <div className="req-vehicle-box">
                <p><FaCalendar className="car-icon"/> From</p>
                <h1>{request.bookingDetails.startDate}</h1>
              </div>
              {/* End Date */}
              <div className="req-vehicle-box">
                <p><FaCalendarAlt className="car-icon"/> To</p>
                <h1>{request.bookingDetails.endDate}</h1> 
              </div>
              {/* Request Status */}
              <div className='status'>
                <div className='pending-status'></div>
                <p>{request.status}</p>
              </div>

            
              <div>
                <button className='cancel-btn' onClick={()=>deleteRequest(request._id)}>Cancel Req</button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default Requests;
