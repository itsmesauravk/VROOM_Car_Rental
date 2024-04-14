import React from "react";
import SideNav from "../components/SideNav";
import "../css/Distributer.css";


const Distributers = () => {


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
