import React from 'react'
import SideNav from './SideNav'
import "../css/Users.css"
import user from "../assets/images/userProfile.jpg"


export const Users = () => {
  return (
    <>
    <div className='userPage'>
    <SideNav />
    <div>
      <h1>Users Details</h1>
      <div className='user'>
      <div className='userDetails'>
      <img  src={user} className='User--Profile' alt='user profile' />
      <div className='userInformations'>
        <p>Name: Ram Thapa</p>
        <p>Age: 21</p>
        <p>Email: ram12@gmail.com</p>
      </div>
      </div>
      </div>
     
      

    </div>
    </div>

    </>
  )
}
