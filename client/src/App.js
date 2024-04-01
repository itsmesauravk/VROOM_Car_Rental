import Home from "./Pages/Home";
import  About from "./Pages/About";
import Cars from "./Pages/Cars"
import Nav from "./components/Nav";
import CarDetail from "./Pages/CarDetails"
import Contact from "./Pages/Contact"

import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/car/:id" element={<CarDetail/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
