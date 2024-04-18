import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaTruckFront } from "react-icons/fa6";

// const token=localStorage.getItem("token")
//getting the user details 
// const [distInfo,setDistInfo] = useState({})

// const token = localStorage.getItem('token')

// const distInfoShow = async()=>{
//     try{
//         const response = await fetch('http://localhost:4000/distributor-info',{
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${token}`
//             }
//         })
//         const data = await response.json()
//         if(data.success === true){
//             setDistInfo(data.dist)
//         }
//     }catch(error){
//         console.log(error)
//     }

// }

// useEffect(()=>{
//     distInfoShow()
// },[])

// console.log(distInfo)

export const Menu=[
    {
        title:'Home',
        icon:<IoMdHome className="nav-icon"/>,
        cName:'nav-link',
        url:'/'
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
        title:'Profile',
        className:'navigation_Lists',
        icon:<IoMdHome className="nav-icon"/>,
        path:'/distributors_profile'
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