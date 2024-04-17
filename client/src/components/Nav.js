import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '../Datas';
import "../css/nav.css";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [userInfo, setUserInfo] = useState({})


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  //get logged in user data
  const userData = async () => {
    try {
      const response = await fetch('http://localhost:4000/user-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      // console.log(data)
      if(data.success === true){
        setUserInfo(data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    userData()
  },[])

  // console.log(userInfo._id)
  

  return (
    <div className='nav'>
      <nav className="navbaritem">
        <div className='logo-side'>
          <h2 className='navlogo'>Vroom</h2>
          {userInfo && <h4 className='nav--user'>Welcome {userInfo.fullname}</h4>}
        </div>
        <ul className='navmenu'>
          {Menu.map((item, index) => (
            <li key={index} className={location.pathname === item.url ? "active" : ""}>
              <Link to={item.url} className={item.cName}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {token ? (
          <>
          <Link to="/user_requests" className='to_dashboard'>Distributor Panel</Link>
            <Link to="/adminDashboard" className='to_dashboard' >Admin Dashboard</Link>
            <div>
              <button className='nav--button' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>
              <Link to={'/login'} className='nav-login'>
            <button className='nav--button'>
              Login
            </button>
              </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
