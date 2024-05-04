import React, { useState } from "react";
import SideNav from "./SideNav";
import "../css/DistributorsCard.css";
import { Dashboard } from "../Pages/Dashboard";

const DistributerCard = (props) => {
  const [newChange, setNewChange] = useState(props.changes);
  return (
    <>
      {newChange ? (
        <div className="differentDistributers">
          <SideNav />
          <div className='dashboard'>
        <span>Total Rental Clients according to cities</span>
        <div className='dist'>
          <div className='Kathmandu'>
            <h1 className='total_kathmandu'>Kathmandu</h1>
            <p className='show_kathmandu'>{"2"}</p>

          </div>
          
          <div  className='pokhara'>
            <h1 className='total_pokhara'>Pokhara</h1>
            <p className='show_pokhara'>{"4"}</p>

          </div>
          
          <div className='birgunj'>
            <h1 className='total_birgunj'>Birgunj</h1>
            <p className='show_birgunj'>{"12"}</p>

          </div>
          <div className='dharan'>
            <h1 className='total_dharan'>Dharan</h1>
            <p className='show_dharan'>{"12"}</p>

          </div>
          <div className='chitwan'>
            <h1 className='total_chitwan'>Chitwan</h1>
            <p className='show_chitwan'>{"12"}</p>

          </div>
          <div className='butwal'>
            <h1 className='total_butwal'>Butwal</h1>
            <p className='show_butwal'>{"12"}</p>

          </div>
          <div className="back">
            <button className="backButton" onClick={() => setNewChange(!newChange)}>Back</button>
          </div>
        </div>
      </div>
      
    </div>
        
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default DistributerCard;
