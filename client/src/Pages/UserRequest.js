import React, { useEffect, useState } from 'react';
import DistNav from './DistNav';
import UserRequestItem from '../components/UserRequestItem';
import '../css/userrequests.css';
import { useParams } from 'react-router-dom';

const UserRequest = () => {
  const [userRequest, setUserRequest] = useState([]);
  const { id } = useParams(); // distributor id

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

  // console.log(userRequest);

  return (
    <div className='userrequests'>
      <DistNav />
      <div className='userReqlist'>
        <h2 className='userh1'>User Requests</h2>
        <hr className='line1'></hr>
        <div className='userreqdiv'>
          {userRequest.length > 0 ? (
            userRequest.map((item, index) => (
              <div key={index} style={{border:"2px solid black"}}>
                <h4>Request id : {item._id}</h4>
                <h2>Sender: {item.senderUser.fullname}</h2>
                <h3>Requested Vehicle : {item.bookingDetails.vehicle}</h3>
                <h3>Start Date : {item.bookingDetails.startDate}</h3>
                <h3>End Date : {item.bookingDetails.endDate}</h3>

                <div>
                  <button>Accept</button>
                  <button>Reject</button>
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
