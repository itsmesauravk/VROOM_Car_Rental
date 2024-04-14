import React from 'react'
import SideNav from './SideNav'
import "../css/Users.css"



export const Users = () => {
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
