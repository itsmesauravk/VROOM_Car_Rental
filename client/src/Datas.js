import { IoMdHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTruckFront } from "react-icons/fa6";

const token=localStorage.getItem("token")

export const Menu=[
    {
        title:'Home',
        icon:<IoMdHome className="nav-icon"/>,
        cName:'nav-link',
        url:'/'
    },
    {
        title:'Requests',
        icon:<IoCarSport className="nav-icon"/>,
        cName:'nav-link',
        url:`/Requests/${token}`
    }
]


export const sideNavPath = [
    {
        title:'Dashboard',
        className:'navigation_Lists',
        icon:<AiOutlineDashboard className="nav-icon" />,
        path:'/adminDashboard'
    },
    {
        title:'Users',
        className:'navigation_Lists',
        icon:<FaUserAlt className="nav-icon" />,
        path:'/users'
    },
    
    {
        title:'Distributers',
        className:'navigation_Lists',
        icon: <FaTruckFront className="nav-icon" />,
        path:'/distributers'
    },
    {
        title:'Add Distributers',
        className:'navigation_Lists',
        icon:"",
        path:'/addDistributers'
    }
    
]
export const distNavPath = [
    {
        title:'Home',
        className:'navigation_Lists',
        icon:<IoMdHome className="nav-icon"/>,
        path:'/'
    },
    {
        title:'User Request',
        className:'navigation_Lists',
        icon:<FaUserAlt className="nav-icon" />,
        path:'/user_requests'
    },
    {
        title:'Rental Clients',
        className:'navigation_Lists',
        icon:<AiOutlineDashboard className="nav-icon" />,
        path:'/rental_clients'
    }
]


export const CityList=[
    "Kathmandu","Pokhara","Birgunj","Hetauda","Chitwan"
]

export const VehicleList=[
    "Sedan","SUV","Jeep","Sumo","Hiace"
]