import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sideNav.css";
import { sideNavPath } from "../Datas";
import { IoMdExit } from "react-icons/io";

const SideNav = () => {
  const location = useLocation();
  const checkPath = (path) => {
      return path;
  };

  const logoutHandler = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  const token = localStorage.getItem('token')
  const [adminInfo, setAdminInfo] = useState({})
  //get the admin details
  const adminDetails = async()=>{
    try {
      const response = await fetch('http://localhost:4000/admin-info',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        
      }
    })
    const data = await response.json()
    // console.log(data)
    setAdminInfo(data.admin)
  }
    catch(err){
      console.log(err)
    }
      
}
  useEffect(() => {
    adminDetails()
  },[])

  return (
    

    <>
      <div className="left1">
        <div className="leftContent">
          <h1>Vroom</h1>
          <div className="adminPortal">
            <p className="admin_pannel">Admin Pannel</p>
          </div>
          <div className="user_profile">
            <img className="userProfile" src="https://images3.alphacoders.com/134/thumb-440-1343297.webp" alt="user profile" />
            <p className="welcome"> 
              Welcome Back,
              <br></br>
              {adminInfo && 
              <h2>{adminInfo.fullname}</h2>
              }
            </p>
          </div>
          <div className="navigation_Lists">
            <ul className="">
              {sideNavPath.map((items, key) => {
                return (
                  <Link key={key} to={items.path} className={items.className}>
                    <li
                      className={
                        location.pathname === checkPath(items.path)
                          ? "activeSideNav"
                          : ""
                      }
                    >
                      {items.icon}
                      {items.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <button onClick={logoutHandler} className="logout1">
            <IoMdExit className="nav-icon"/>
              Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNav;
