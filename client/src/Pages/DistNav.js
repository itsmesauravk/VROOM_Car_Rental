import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../css/distnav.css";
// import { distNavPath } from "../Datas";
import { IoMdExit } from "react-icons/io";

const DistNav = () => {
  const location = useLocation();
  const [distInfo, setDistInfo] = useState({})
  const {id} = useParams()
  // console.log("distId", id)

  const token = localStorage.getItem('token')

  if(!token){
    window.location.href = '/login'
  }




  //get the distributor info
   //get logged in user data
   const distributorData = async () => {
    try {
      const response = await fetch('http://localhost:4000/distributor-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      // console.log(data)
      if(data.success === true){
        // console.log(data)
        setDistInfo(data.dist)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
   distributorData()
  },[])
  // console.log(distInfo)

  const checkPath = (path) => {
    if (path === "/distributerForm") {
      return "/dashboard";
    } else {
      return path;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="left">
      <div className="leftContent">
        <h1>Vroom</h1>
        <div className="adminPortal">
        </div>
        <div className="user_profile">
          <p className="welcome">
            {distInfo && <h2 className="nav--user"> {distInfo.fullname}</h2>}
          </p>
        </div>
        <hr className="line" />
        <div className="navigation_Lists">
          {/* <ul className="">
            {distNavPath.map((items, key) => (
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
            ))}
          </ul> */}
          <button>
            <Link to={`/distributors_profile/${id}`} className="nav-link">
              Profile
            </Link>
          </button>
          <button>
            <Link to={`/user_requests/${id}`} className="nav-link">
              User Requests
            </Link>
          </button>
          <button>
            <Link to={`/rental_clients/${id}`} className="nav-link">
              Rental Clients
            </Link>
          </button>
        </div>
        <button onClick={logoutHandler} className="logout">
            <IoMdExit className="nav-icon"/>
              Logout
          </button>
      </div>
    </div>
  );
};

export default DistNav;
