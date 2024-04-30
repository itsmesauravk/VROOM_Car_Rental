import React, { useState } from 'react'
import DistNav from './DistNav'


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

  useState(()=>{
    distributorInfo()
  },[])

  return (
    <div style={{display:"flex",gap:'1rem'}}>
        <DistNav />
        <div>
          DistProfile
        </div>
    </div>
  )
}

export default DistProfile