import React from 'react'
import { Menu } from '../Datas'
import {Link} from "react-router-dom"
import "../css/nav.css"
import { useLocation } from 'react-router-dom'
const Nav = () => {
    const location=useLocation();
  return (
    <div className='nav'>
    <nav className="navbaritem">
      <div className='logo-side'>
        <h2 className='navlogo'>Vroom</h2>
      </div>
      <ul className='navmenu'>
        {Menu.map((item,index)=>{
            return(
                <li key={index} className={location.pathname===item.url?"active":""}>
                    <Link to={item.url} className={item.cName}>
                        {item.icon}
                        {item.title}
                    </Link>
                </li>
            )
        })}
      </ul>
      <div>
        <button className='nav--button'>
            Sign Up
        </button>
      </div>
    </nav>
    </div>
  )
}

export default Nav
