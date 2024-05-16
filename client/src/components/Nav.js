import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../Datas"; // Importing Menu from Datas
import "../css/nav.css";
import { HiBars3 } from "react-icons/hi2";
import { ImCross } from "react-icons/im";

const Nav = () => {
  const [openClose, setOpenClose] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setUserInfo({});
    navigate('/');
    window.location.reload();
  };

  const userData = async () => {
    try {
      const response = await fetch("http://localhost:4000/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success === true) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      userData();
    }
  }, [token]);

  const openSideBar = () => {
    setOpenClose(!openClose);
  };

  const showSideBar = () => {
    return (
      <div className="navigationLinks" style={{ display: openClose ? "none" : "block" }}>
        <button className="closeSideBar" onClick={openSideBar} style={{ display: openClose ? "none" : "block" }}>
          <ImCross />
        </button>
        <ul className="menuNav">
          <div className="navUserDetail">
            <img
              style={{ width: "50px", height: "50px" }}
              src={`http://localhost:4000/${userInfo.photo}`}
              alt="user profile"
              className="navImage"
            />
            {userInfo && (
              <h4 style={{ marginRight: "2rem" }} className="nav--user">
                {userInfo.fullname}
              </h4>
            )}
          </div>
          {Menu.map((item, index) => (
            <li
              key={index}
              className={location.pathname === item.url ? "active" : ""}
            >
              <Link to={item.url} className={item.cName}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={`/Requests/${userInfo._id}`}>
          <h1 className="navButton">Request</h1>
        </Link>
        <Link to={`/CarCart/${userInfo._id}`}>
          <h1 className="navButton">Car-Cart</h1>
        </Link>
        <Link to={`/Settings/${userInfo._id}`}>
          <h1 className="navButton">Settings</h1>
        </Link>
      </div>
    );
  };

  return (
    <div className="nav">
      <button className="showSideBar" onClick={openSideBar}>
        <HiBars3 />
      </button>
      <nav className="navbaritem">
        <div className="logo-side">
          <h2 className="navlogo">Vroom</h2>
        </div>
        <ul className="navmenu">
          <div className="nav-user-detail">
            <img
              style={{ width: "50px", height: "50px" }}
              src={`http://localhost:4000/${userInfo.photo}`}
              alt="user profile"
              className="nav-image"
            />
            {userInfo && (
              <h4 style={{ marginRight: "2rem" }} className="nav--user">
                {userInfo.fullname}
              </h4>
            )}
          </div>
          {Menu.map((item, index) => (
            <li key={index} className={location.pathname === item.url ? "active" : ""}>
              <Link to={item.url} className={item.cName}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={`/Requests/${userInfo._id}`}>
          <h1 className="nav--button">Request</h1>
        </Link>
        <Link to={`/CarCart/${userInfo._id}`}>
          <h1 className="nav--button">Car-Cart</h1>
        </Link>
        {isLogin && (
          <Link to={`/Settings/${userInfo._id}`}>
            <h1 className="nav--button">Settings</h1>
          </Link>
        )}
        {isLogin ? (
          <button className="nav--button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={"/login"} className="nav-login">
            <button className="nav--button">Login</button>
          </Link>
        )}
      </nav>
      {showSideBar()}
    </div>
  );
};

export default Nav;
