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

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<PasswordReset/>} />
        <Route path='/Requests' element={<Requests/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route  path="/distributers" element={<Distributers />}  />
        <Route  path="/rental_clients" element={<RentalClients/>}  />
        <Route  path="/user_requests" element={<UserRequest/>}  />
      </Routes>
    </div>
  );
}

export default App;
