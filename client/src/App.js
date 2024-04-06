import Home from "./Pages/Home";
import  About from "./Pages/About";
import Cars from "./Pages/Cars"
import Nav from "./components/Nav";
import CarDetail from "./Pages/CarDetails"
import Contact from "./Pages/Contact"

import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordReset from "./Pages/PasswordReset";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/car/:id" element={<CarDetail/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/forgot" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<PasswordReset/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
