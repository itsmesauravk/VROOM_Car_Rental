import React, { useState } from "react";
import SideNav from "./SideNav";
import "../css/DistributersForm.css"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const DistributerForm = () => {
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");
  const [phone,setPhone] = useState();
  const [location,setLocation] = useState("");
  const [email,setEmail] = useState();
  const [password,setPass] = useState("");
  const [showHide, setShowHide] = useState(false)

  
  const handleForm = (e) => {
    e.preventDefault();
  };

  const distributersData = ()=>{
    console.log(name)
    console.log(address)
    console.log(phone)
    console.log(location)
    console.log(email)
    console.log(carName)

  }
  
  const clearData = ()=>{
    setAddress(" ")
    setEmail(" ")
    setName(" ")
    setLocation(" ")
    setPhone(" ")
    setPass(" ")
  }

  return (
    <> 
        <div className="distributerForm">
          <SideNav />
          <form onSubmit={(e) => handleForm(e)} className="distributerDetailsForm">
            <h1>Distributer Form</h1>
            <br></br>
            <div className="get_details">
              <div className="name">
                <p>Full Name</p>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} required />
              </div>
              <div className="company">
                <p>Address</p>
                <input type="text" value={address}  onChange={(e)=>setAddress(e.target.value)}  required />
              </div>
              <div className="phone">
                <p>Phone Number</p>
                <input type="number" value={phone}  onChange={(e)=>setPhone(e.target.value)} required />
              </div>
              <div className="company_location">
                <p>Distributer Location</p>
                <input type="text" value={location}  onChange={(e)=>setLocation(e.target.value)} required />
              </div>
              <div className="registration number">
                <p>Email</p>
                <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="car_details">
                <p>Password</p>
                <input type={showHide ? "text" : "password"}  value={password}  onChange={(e)=>setPass(e.target.value)} />
                <button type='button' className='eyeButton'  onClick={()=>setShowHide(!showHide)}>{showHide ? <FaRegEye /> :  <FaRegEyeSlash /> } </button>
              </div>
            </div>
            <div className="cancelAndSubmit">
            <button className="cancelForm" onClick={clearData}>Cancel</button>
            <button className="submitForm" onClick={distributersData}>Submit</button>
          
            </div>
            </form>
        </div>

    </>
  );
};

export default DistributerForm;
