import React from 'react';
import '../css/userrequestitem.css';

const UserRequestItem = ({ user }) => {
  const { imageUrl, userName, vehicle, cityName, startDate, endDate } = user;

  return (
    <div className='user-request-item'>
      <div className='user-info'>
        <img src={imageUrl} alt='User' className='user-image' />
        <div className='user-details'>
          <p className='user-name'>{userName}</p>
          <p className='vehicle-name'>Vehicle Booked: <span> {vehicle}</span></p>
          <p className='city-name'>City: <span>{cityName}</span></p>
          <p className='date-range'>Date Rented:<span>{`${startDate} - ${endDate}`}</span> </p>
      </div>
        </div>
      <div className='action-buttons'>
        <button className='approve-button'>Approve</button>
        <button className='deny-button'>Deny</button>
      </div>
    </div>
  );
};

export default UserRequestItem;
