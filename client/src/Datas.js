import { IoMdHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

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

export const CityList=[
    "Kathmandu","Pokhara","Birgunj","Hetauda","Chitwan"
]

export const VehicleList=[
    "Sedan","SUV","Jeep","Sumo","Hiace"
]