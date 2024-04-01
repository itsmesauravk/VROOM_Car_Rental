import { IoMdHome } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

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
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:2,
        title:"Audi",
        img:"https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 12000 / Day",
        Model:"Model-None",
        Mode:"Automatic",
        Rating: Array(4).fill(<FaStar />)
    },
    {
        id:3,
        title:"Mercedes",
        img:"https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 17000 / Day",
        Model:"Model-2020",
        Mode:"Manual",
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:4,
        title:"RangeRover",
        img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 13000 / Day",
        Model:"Model-2024",
        Mode:"Manual",
        Rating: Array(4).fill(<FaStar />)
    },
    {
        id:5,
        title:"BMW",
        img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 11000 / Day",
        Model:"Model-2021",
        Mode:"Automatic",
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:6,
        title:"Audi",
        img:"https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 12000 / Day",
        Model:"Model-None",
        Mode:"Automatic",
        Rating: Array(4).fill(<FaStar />)
    },
    {
        id:7,
        title:"Mercedes",
        img:"https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 17000 / Day",
        Model:"Model-2020",
        Mode:"Manual",
        Rating: Array(5).fill(<FaStar />)
    },
    {
        id:8,
        title:"RangeRover",
        img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        price:"Rs 13000 / Day",
        Model:"Model-2024",
        Mode:"Manual",
        Rating: Array(4).fill(<FaStar />)
    }
]