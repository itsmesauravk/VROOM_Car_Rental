import React, { useEffect, useState } from 'react'
import "../css/Dashboard.css"
import SideNav from '../components/SideNav'
import DistributerCard from '../components/DistributerCard';


//Admin dashboard
export const Dashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [rentalClients, setRentalClients] = useState([]);
  const [change, setChange] = useState(false);



  const showUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Users error", error);
    }
  }


  const showDistributors = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-distributors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDistributors(data.distributors);
    } catch (error) {
      console.log("Distributors error", error);
    }
  }

  const showTotalRentalClients = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-total-rental-clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRentalClients(data.rentalClients);
    } catch (error) {
      console.log("Distributors error", error);
    }
  }


  useEffect(() => {
    showUsers();
    showDistributors();
    showTotalRentalClients();

  },[]);

  // console.log(users)


  

  return (
    <>
    {change ? <DistributerCard changes={change}  /> : <div className='dashboardPage'>
      <SideNav />
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className='dash'>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total Users</h1>
            <p className='show_users'>{users.length}</p>

          </div>
          <div  className='TotalDistributers' >
            <h1 className='total_distributer'>Total Distributers</h1>
            <p className='show_distributer'>{distributors.length}</p>

          </div>          
          <div className='TotalCars' >
            <h1 className='total_cars'>Total Rental Client</h1>
            <p className='show_cars'>{rentalClients.length}</p>
            <div>
              <button className='showMore' onClick={()=>setChange(!change)}>Show More</button>
            </div>

          </div>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total ---</h1>
            <p className='show_users'>-</p>

          </div>
        </div>
      </div>
      
    </div>
    }
    
    </>
  )
}
