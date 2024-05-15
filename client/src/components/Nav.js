import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "../Datas"; // Importing Menu from Datas
import "../css/nav.css";
import { HiBars3 } from "react-icons/hi2";
import { ImCross } from "react-icons/im";

const Nav = () => {

  const [openClose, setOpenClose] = useState(true);

  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // State to store user info
  const [userInfo, setUserInfo] = useState({});

  // Function to handle user logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Reload the window to clear user session
    window.location.reload();
    // Alternative method to navigate to home page (if useNavigate hook is imported)
    // navigate('/');
  };

  // Function to fetch user data
  const userData = async () => {
    try {
      // Fetch user info from the backend API
      const response = await fetch("http://localhost:4000/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Parse response data
      const data = await response.json();
      // If request is successful, update userInfo state with user data
      if (data.success === true) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    userData();
  }, []);

  

  const openSideBar = ()=>{
    setOpenClose(!openClose)
  }

  const showSideBar = ()=>{
    return(
      <>
      <div className="navigationLinks" style={{display:openClose ? "none": "block"}}>
      <button className="closeSideBar" onClick={openSideBar} style={{display: openClose ? "none" : "block"}}  >
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
          </ul>navigationLinks

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
      </>
    )
  }


  
  return (
    <>
    
      <div className="nav">
      <button className="showSideBar" onClick={openSideBar} >
          <HiBars3 />
      </button>
        <nav className="navbaritem">
          <div className="logo-side">
            <h2 className="navlogo">Vroom</h2>
          </div>
          {/* Navigation menu */}
          <ul className="navmenu">
            {/* Map through Menu items to generate navigation links */}

            {/* Display user's full name */}
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

          {/* Link to user's requests page */}
          <Link to={`/Requests/${userInfo._id}`}>
            <h1 className="nav--button">Request</h1>
          </Link>
          <Link to={`/CarCart/${userInfo._id}`}>
            <h1 className="nav--button">Car-Cart</h1>
          </Link>
          <Link to={`/Settings/${userInfo._id}`}>
            <h1 className="nav--button">Settings</h1>
          </Link>

          {/* Conditional rendering based on user authentication */}
          {token ? (
            <>
              {/* Display logout button if user is logged in */}
              <div>
                <button className="nav--button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            // Display login button if user is not logged in
            <div>
              <Link to={"/login"} className="nav-login">
                <button className="nav--button">Login</button>
              </Link>
            </div>
          )}
        </nav>
        {showSideBar()}
      </div>
    </>
  );
};

export default Nav;
