import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../css/Distributer.css";





const Distributers = () => {
  const [distributors, setDistributors] = useState([]);

  const showDistributors = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-distributors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDistributors(data.distributors);
    } catch (error) {
      console.log("Distributors error", error);
    }
  }

  useEffect(() => {
    showDistributors();
  },[]);

  console.log(distributors)

  return (
    <>
 <div className='distributerPage'>
    <SideNav />
    <div>
      <h1>Distributers</h1>
      <div >
        <table className='distributers'>
          <tr className='heading'>
            <th>S.No.</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Car rented</th>
            <th>Address</th>
          </tr>
          <tr className='values'>
            <td >1</td>
            <td className='imageAndName'>
             <p>Ram Thapa</p>
            </td>
            <td>ram12@gmail.com</td>
            <td>10</td>
            <td>Kathmandu</td>
          </tr>
          <tr className='values'>
            <td >1</td>
            <td className='imageAndName'>
              <p>Ram Thapa</p>
            </td>
            <td>ram12@gmail.com</td>
            <td>10</td> 
            <td>Kathmandu</td>
          </tr>

        </table>
      </div>
     
      

    </div>
    </div>

    </>
  );
};

export default Distributers;
