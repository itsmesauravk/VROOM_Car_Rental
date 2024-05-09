import React, { useContext, useEffect, useState } from 'react';
import DistNav from './DistNav';
import '../css/userrequests.css';
import "../css/userrequestitem.css"
import { useParams } from 'react-router-dom';
import { SelectCarContext } from '../components/SelectCarContext';
import SelectCars from '../components/SelectCars';

const UserRequest = () => {
  const {handleSelectCar,selectCar}=useContext(SelectCarContext)
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

  
  //accept reject request
  const acceptRejectRequest = async (requestId, action) => {
    handleSelectCar();
    // try {
    //   const response = await fetch(`http://localhost:4000/accept-reject-request/${requestId}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ action })
    //   });
    //   const result = await response.json();
    //   if (result.success === true) {
    //     showRequest();
    //     handleSelectCar();
        
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }



  return (<>
      <DistNav />
    <div className='userrequests'>
      <div className='userReqlist'>
        <h2 className='userh1'>User Requests</h2>
        <hr className='line1'></hr>
        <div className='userreqdiv'>
          {userRequest.length > 0 ? (
            userRequest.map((item, index) => (
              <div key={index} className='user-request-item'>
                <div className="user-info">
                <img 
                src={item.senderUser?.photo ? `http://localhost:4000/${item.senderUser?.photo}` : imageUrl}
                
                alt='User' className='user-image' />
                <div className="user-details">
                <p className='req-id'>Request id : {item._id}</p>
                <p className='user-name'>User: {item.senderUser?.fullname}</p>
                <p className='vehicle-name'>Requested Vehicle:<span>{item.bookingDetails.vehicle}</span></p>
                <p className='date-range'>DateRented:<span>Start Date : {item.bookingDetails.startDate} - {item.bookingDetails.endDate}</span></p>
                </div>
                </div>

                 {item.status === 'Pending' ? (
                  <div className='action-buttons'>
                  <button className='approve-button' onClick={()=>acceptRejectRequest(item._id, "accept")}>Approve</button>
                  <button className='deny-button' onClick={()=>acceptRejectRequest(item._id, "reject")}>Deny</button>
              </div>
              ):(
                <p className={item.status==="Rejected"?"req-status rejected": "req-status accepted"}>Status : {item.status}</p>
              )}
               
              </div>
            ))
          ) : (
            <p>No request found, please try again !!</p>
          )}
        </div>
        {selectCar && <SelectCars/>}
      </div>
    </div>
  </>
  );
};

export default UserRequest;