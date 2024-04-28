import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../css/distnav.css";
import { IoMdExit } from "react-icons/io";

const DistNav = () => {
  const location = useLocation();
  const [distInfo, setDistInfo] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const activePage = (pathname) => {
    return location.pathname === pathname ? "activeSideNav" : "";
  };

  const distributorData = async () => {
    try {
      const response = await fetch("http://localhost:4000/distributor-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success === true) {
        setDistInfo(data.dist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    distributorData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="left">
      <div className="leftContent">
        <h1>Vroom - Distributor</h1>
        <div className="adminPortal"></div>
        <div className="user_profile">
          <p className="welcome">
            {distInfo && <h2 className="nav--user"> {distInfo.fullname}</h2>}
          </p>
        </div>
        <hr className="line" />

        <div className="navigation_Lists">
          <button className={`distnav--button ${activePage(`/distributors_profile/${id}`)}`}>
            <Link to={`/distributors_profile/${id}`} className="nav-link">
              Profile
            </Link>
          </button>
          <button className={`distnav--button ${activePage(`/user_requests/${id}`)}`}>
            <Link to={`/user_requests/${id}`} className="nav-link">
              Requests
            </Link>
          </button>
          <button className={`distnav--button ${activePage(`/rental_clients/${id}`)}`}>
            <Link to={`/rental_clients/${id}`} className="nav-link">
              Clients
            </Link>
          </button>
          <button className={`distnav--button ${activePage(`/add-car`)}`}>
            <Link to='/add-car' className="nav-link">
              Add Clients
            </Link>
          </button>
          <button onClick={logoutHandler} className="distnav--button-logout">
            <IoMdExit className="nav-icon" />
            <Link to="" className="nav-link">
              Logout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistNav;
