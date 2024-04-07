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

export const Carlist=[
    {
        id:1,
        title:"BMW",
        img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 11000 / Day",
        Model:"Model-2021",
        Mode:"Automatic",
        city:"Kathmandu",
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:2,
        title:"Audi",
        img:"https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 12000 / Day",
        Model:"Model-None",
        Mode:"Automatic",
        city:"Pokhara",
        Rating: Array(4).fill(<FaStar />)
    },
    {
        id:3,
        title:"Mercedes",
        img:"https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 17000 / Day",
        Model:"Model-2020",
        Mode:"Manual",
        city:"Chitwan",
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:4,
        title:"RangeRover",
        img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 13000 / Day",
        Model:"Model-2024",
        Mode:"Manual",
        city:"Dharan",
        Rating: Array(4).fill(<FaStar />)
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
