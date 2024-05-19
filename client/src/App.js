import Home from "./Pages/Home";
import  Requests from "./Pages/Requests";
import Cars from "./Pages/Cars"
import Contact from "./Pages/Contact"

import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordReset from "./Pages/PasswordReset";
import { Dashboard } from "./Pages/Dashboard";
import { Users } from "./components/Users";
import Distributers from "./Pages/Distributers";
import RentalClients from "./Pages/RentalClients"
import UserRequest from "./Pages/UserRequest"
import DistributerForm from "./components/DistributerForm"
import AddAdmin from "./Pages/AddAdmin";
import DistProfile from "./Pages/DistProfile";
import AddCars from "./Pages/AddCars";
import Settings from "./Pages/Settings"
import CarCart from "./Pages/CarCart";
import About from "./Pages/About"


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<PasswordReset/>} />
        <Route path="/Requests/:userId" element={<Requests/>}/>
        <Route path="/CarCart/:userId" element={<CarCart/>}/>
        <Route path="/Settings/:userId" element={<Settings/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route  path="/distributers" element={<Distributers />}  />
        <Route  path="/distributors_profile/:id" element={<DistProfile/>}  />
        <Route  path="/rental_clients/:id" element={<RentalClients/>}  />
        <Route  path="/user_requests/:id" element={<UserRequest/>}  />
        <Route path="/add_car/:id" element={<AddCars/>} />
        <Route  path="/addDistributers" element={<DistributerForm />}  />
        <Route  path="/about" element={<About />}  />


        <Route path="/add-admin-dashboard" element={<AddAdmin/>} />

      </Routes>
    </div>
  );
}

export default App;
