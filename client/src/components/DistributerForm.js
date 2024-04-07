import React, { useState } from "react";
import "../css/Distributer.css";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Distributers from "../Pages/Distributers";

const DistributerForm = () => {
  const [distributersPage, setDistributersPAge] = useState(false);
  const [name,setName] = useState("");
  const [company,setCompany] = useState("");
  const [phone,setPhone] = useState();
  const [location,setLocation] = useState("");
  const [registrationNumber,setRegistrationNumber] = useState();
  const [carName,setCarName] = useState("");

  const change = () => {
    setDistributersPAge(!distributersPage);
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {distributersPage ? (
        <Distributers />
      ) : (
        <div className="distributerForm">
          <SideNav />
          <form onSubmit={(e) => handleForm(e)} className="distributerDetailsForm">
            <div className="get_details">
              <div className="name">
                <p>Full Name</p>
                <input type="text" value={name}  onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="company">
                <p>Company Name</p>
                <input type="text" value={company}  onChange={(e)=>setCompany(e.target.value)} />
              </div>
              <div className="phone">
                <p>Phone Number</p>
                <input type="number" value={phone}  onChange={(e)=>setPhone(e.target.value)} />
              </div>
              <div className="company_location">
                <p>Company Location</p>
                <input type="text" value={location}  onChange={(e)=>setLocation(e.target.value)}/>
              </div>
              <div className="registration number">
                <p>Company Registration Number</p>
                <input type="number" value={registrationNumber}  onChange={(e)=>setRegistrationNumber(e.target.value)}/>
              </div>
              <div className="car_details">
                <p>Car Name</p>
                <input type="text"value={carName}  onChange={(e)=>setCarName(e.target.value)} />
              </div>
            </div>
            <Link className="submitForm" to="/distributers">
              <button onClick={change}>Submit</button>
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default DistributerForm;
