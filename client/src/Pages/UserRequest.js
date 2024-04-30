import React, { useEffect, useState } from 'react';
import DistNav from './DistNav';
import '../css/userrequests.css';
import "../css/userrequestitem.css"
import { useParams } from 'react-router-dom';

const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const { id } = useParams();
  const imageUrl= "https://w0.peakpx.com/wallpaper/123/749/HD-wallpaper-baki-raitai-anime-fight.jpg";

  const showRequest = async () => {
    try {
      const response = await fetch(`http://localhost:4000/show-request/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success === true) {
        setUserRequest(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      showRequest();
    }
  }, []);


  return (
    <div className='userrequests'>
      <DistNav />
      <div className='userReqlist'>
        <h2 className='userh1'>User Requests</h2>
        <hr className='line1'></hr>
        <div className='userreqdiv'>
          {userRequest.length > 0 ? (
            userRequest.map((item, index) => (
              <div key={index} className='user-request-item'>
                <div className="user-info">
                <img 
                // src={item.senderUser?.photo ? `http://localhost:4000/${item.senderUser?.photo}` : imageUrl}
                src={imageUrl}
                alt='User' className='user-image' />
                <div className="user-details">
                <p className='req-id'>Request id : {item._id}</p>
                <p className='user-name'>User: {item.senderUser?.fullname}</p>
                <p className='vehicle-name'>Requested Vehicle:<span>{item.bookingDetails.vehicle}</span></p>
                <p className='date-range'>DateRented:<span>Start Date : {item.bookingDetails.startDate} - {item.bookingDetails.endDate}</span></p>
                </div>
                </div>

                 <div className='action-buttons'>
        <button className='approve-button'>Approve</button>
        <button className='deny-button'>Deny</button>
      </div>
               
              </div>
            ))
          ) : (
            <p>No request found, please try again !!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRequest;