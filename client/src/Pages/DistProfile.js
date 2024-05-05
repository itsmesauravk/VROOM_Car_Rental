import React, { useEffect, useState } from 'react'
import DistNav from './DistNav'
import "../css/distprofile.css"


const DistProfile = () => {

  const [distributor, setDistributor] = useState({});

  const token = localStorage.getItem('token');

  const distributorInfo = async()=>{
    try {
      const response = await fetch('http://localhost:4000/distributor-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success === true) {
        console.log(data.dist)
        setDistributor(data.dist);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    distributorInfo()
  },[])

  return (
    <div style={{display:"flex",gap:'1rem'}}>
        <DistNav />
        <div className='settings-container2'>
        <div className='user-details2'>
           <div className="user-card2">
                            <img
                                className='setting-photo'
                                src= {`http://localhost:4000/${distributor.profilePicture}`}
                                alt=""
                            />
                            <h2>{distributor.fullname}</h2>
                            <hr className='line2'></hr>
                            <div className='detail-card'>
                            <p>Distribution Location: {distributor.distributionLocation}</p>
                            <p>Email: {distributor.email}</p>
                            <p>Contact: {distributor.phone}</p>
                            <p>Address: {distributor.address}</p>
                            </div>
                        </div>
        </div>
        </div>
    </div>
  )
}

export default DistProfile