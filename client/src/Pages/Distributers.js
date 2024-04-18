import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../css/Distributer.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
  };

  useEffect(() => {
    showDistributors();
  }, []);

  //for handling edit and delete 
  const editDeleteHandler = async (id, action) => {
    try {
      const response = await fetch(`http://localhost:4000/edit-delete-handler/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: action }),
      });
      const data = await response.json();
      console.log(data);
      showDistributors();
    } catch (error) {
      console.log("Distributors error", error);
    }
    // console.log(id, action);
  }

  // console.log(distributors);

  return (
    <>
      <div className="distributerPage">
        <SideNav />
        <div>
          <h1 className="dist">Distributers</h1>
          <div>
            <table className="distributers">
              <tr className="heading">
                <th>S.No.</th>
                <th>Distributors</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th></th>
              </tr>
              {distributors.map((datas, key) => {
                return (
                  <>
                    <tr className="values" key={key}>
                      <td style={{ fontWeight: "bold" }}>{key}</td>
                      <td className="imageAndName">
                        
                        <p style={{ fontWeight: "bold" }}> {datas.fullname}</p>
                      </td>
                      <td style={{ fontWeight: "bold" }}>{datas.email}</td>
                      <td style={{ fontWeight: "bold" }}>{datas.phone}</td>
                      <td style={{ fontWeight: "bold" }}>
                        {datas.distributionLocation}
                      </td>
                      <div className="editDelete">

                      <button onClick={()=>editDeleteHandler(datas._id, "edit")}>
                          <td className="editButton">
                            <FaEdit />
                          </td>
                        </button>

                        <button onClick={()=>editDeleteHandler(datas._id, "delete")} >
                          <td className="deleteButton">
                            <MdDelete />
                          </td>
                        </button>
                        
                      </div>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Distributers;
