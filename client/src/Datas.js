import { IoMdHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTruckFront } from "react-icons/fa6";

export const Menu=[
    {
        title:'Home',
        icon:<IoMdHome className="nav-icon"/>,
        cName:'nav-link',
        url:'/'
    },
    {
        title:'Cars',
        icon:<IoCarSport className="nav-icon"/>,
        cName:'nav-link',
        url:'/cars'
    },
    {
        title:'About',
        icon:< IoIosInformationCircle className="nav-icon"/>,
        cName:'nav-link',
        url:'/about'
    },
    {
        title:'Contact',
        icon:<FaPhone className="nav-icon"/>,
        cName:'nav-link',
        url:'/contact'
    }
]


export const sideNavPath = [
    {
        title:'Home',
        className:'navigation_Lists',
        icon:<IoMdHome className="nav-icon"/>,
        path:'/'
    },
    {
        title:'Users',
        className:'navigation_Lists',
        icon:<FaUserAlt className="nav-icon" />,
        path:'/users'
    },
    {
        title:'Dashboard',
        className:'navigation_Lists',
        icon:<AiOutlineDashboard className="nav-icon" />,
        path:'/dashboard'
    },
    {
        title:'Distributers',
        className:'navigation_Lists',
        icon: <FaTruckFront className="nav-icon" />,
        path:'/distributers'
    }
    
]


export const CityList=[
    "Kathmandu","Pokhara","Birgunj","Hetauda","Chitwan"
]

export const VehicleList=[
    "Sedan","SUV","Jeep","Sumo","Hiace"
]