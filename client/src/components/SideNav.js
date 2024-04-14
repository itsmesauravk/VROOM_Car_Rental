import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sideNav.css";
import { sideNavPath } from "../Datas";
import { IoMdExit } from "react-icons/io";

const SideNav = () => {
  const location = useLocation();
  const checkPath = (path) => {
      return path;
  };

  return (
    <>
      <div className="left">
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
              Ram Thapa
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
          <Link className="logout" to="/login">
            <IoMdExit className="nav-icon"/>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
