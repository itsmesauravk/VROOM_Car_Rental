import React from 'react';
import DistNav from './DistNav';
import UserRequestItem from '../components/UserRequestItem';
import '../css/userrequests.css';

const UserRequest = () => {

  const user = {
    imageUrl: 'https://w0.peakpx.com/wallpaper/123/749/HD-wallpaper-baki-raitai-anime-fight.jpg',
    userName: 'Baki Hanma',
    vehicle: 'Hiace',
    cityName: 'Kathmandu',
    startDate: '2024-04-11',
    endDate: '2024-04-15'
  };

  return (
    <div className='userrequests'>
      <DistNav />
      <div className='userReqlist'>
        <h2 className='userh1'>User Requests</h2>
        <hr className='line1'></hr>
      <div className='userreqdiv'>
        <UserRequestItem user={user} />
      </div>
      </div>
    </div>
  );
};

export default UserRequest;
