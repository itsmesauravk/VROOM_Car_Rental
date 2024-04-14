import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import "../css/Users.css"




export const Users = () => {
  const [users, setUsers] = useState([]);


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

  useEffect(() => {
    showUsers();
  },[]);

  console.log(users)


  return (
    <>
    <div className='userPage'>
    <SideNav />
    <div>
      <h1>Users Details</h1>
      <div >
        <table className='user'>
          <tr className='headig'>
            <th>S.No.</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Car rented</th>
            <th>Address</th>
          </tr>
          <tr className='values'>
            <td >1</td>
            <td className='imageAndName'>
              <img src={"https://images3.alphacoders.com/134/thumb-440-1343297.webp"} alt='user profile' className='user--Profile' />
              <p>Ram Thapa</p>
            </td>
            <td>ram12@gmail.com</td>
            <td>10</td>
            <td>Kathmandu</td>
          </tr>
          <tr className='values'>
            <td >1</td>
            <td className='imageAndName'>
              <img src={"https://images3.alphacoders.com/134/thumb-440-1343297.webp"} alt='user profile' className='user--Profile' />
              <p>Ram Thapa</p>
            </td>
            <td>ram12@gmail.com</td>
            <td>10</td> 
            <td>Kathmandu</td>
          </tr>

        </table>
      </div>
     
      

    </div>
    </div>

    </>
  )
}
