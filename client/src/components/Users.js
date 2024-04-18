import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import "../css/Users.css"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";




export const Users = () => {
  const [users, setUsers] = useState([]);


  const showUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Users error", error);
    }
  }

  useEffect(() => {
    showUsers();
  },[]);


    //for handling edit and delete 
    const editDeleteHandler = async (id, action) => {
      try {
        const response = await fetch(`http://localhost:4000/edit-delete-handler/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ methode: action }),
        });
        const data = await response.json();
        console.log(data);
        window.location.reload();
        // showDistributors();
      } catch (error) {
        console.log("Distributors error", error);
      }
      // console.log(id, action);
    }

 


  return (
    <>
    <div className='userPage'>
    <SideNav />
    <div>
      <h1 className='u'>Users Details</h1>
      <div >
        <table className='user'>
          <tr className='headig'>
            <th>S.No.</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>
          {
            users.map((values,key)=>{
              return(
                <>
                <tr className='values' key={key}>
            <td style={{fontWeight: "bold"}} >{key}</td>
            <td className='imageAndName'>
              
            <p style={{fontWeight: "bold"}}>{values.fullname}</p>
            </td>
            <td style={{fontWeight: "bold"}} >{values.email}</td>
            <td  style={{fontWeight: "bold"}}>{values.phone}</td>
            <td style={{fontWeight: "bold"}} >{values.address}</td>
            <div className='editDelete'>
            <button onClick={()=>editDeleteHandler(values._id, "edit")}>
                <td className='editButton'><FaEdit /></td>
              </button>
              <button onClick={()=>editDeleteHandler(values._id, "delete")}>
                <td className='deleteButton'><MdDelete /></td>
              </button>
              
            </div>
          </tr>
          </>
              )
            })
          }
        </table>
      </div>
     
      

    </div>
    </div>

    </>
  )
}
