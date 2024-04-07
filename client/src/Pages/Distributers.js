import React, { useState } from "react";
import SideNav from "../components/SideNav";
import "../css/Distributer.css";
import user from "../assets/images/userProfile.jpg";
import DistributerForm from "../components/DistributerForm";

const Distributers = () => {
  const [addDistributers, setAddDistributers] = useState(false);
  const changeComponent = () => {
    setAddDistributers(!addDistributers);
  };

  return (
    <>
      {addDistributers ? (
        <DistributerForm />
      ) : (
        <div className="distributerPage">
          <SideNav />
          <div className="distributers">
            <div className="distributerProfile">
              <h1>Distributers</h1>
              <div className="distributerCount">
                <img className="userProfile" src={user} alt="user profile" />
                <div>
                <p className="user_name">Ram Thapa</p>
                <p>Age: 21</p>
                <p>Email: ram12@gmail.com</p>
                </div>
              </div>
            </div>
            <button onClick={changeComponent} className="adding_distributers">
              Add Distributers
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Distributers;
