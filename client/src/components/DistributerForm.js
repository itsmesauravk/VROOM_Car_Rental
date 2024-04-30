import React, { useState } from "react";
import SideNav from "./SideNav";
import "../css/DistributersForm.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const DistributerForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [changeImage, setChangeImage] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profilePicture', changeImage); 
      formData.append('fullname', name);
      formData.append('address', address);
      formData.append('phone', phone);
      formData.append('distributionLocation', location);
      formData.append('email', email);
      formData.append('password', password);
  
      const response = await fetch(
        "http://localhost:4000/register-distributor",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Distributor added successfully");
        clearData();
      } else {
        alert("Distributor not added");
      }
    } catch (error) {
      console.log("Add distributor error", error);
    }
  };

  const clearData = () => {
    setAddress("");
    setEmail("");
    setName("");
    setLocation("");
    setPhone("");
    setPass("");
    setChangeImage(null);
  };

  return (
    <>
      <div className="distributerForm">
        <SideNav />
        <form
          onSubmit={(e) => handleForm(e)}
          className="distributerDetailsForm"
          encType="multipart/form-data"
        >
          <h1>Distributer Form</h1>
          <br />
          <div className="profile-picture">
            <div className="image-uploader">
              {changeImage ? (
                <img
                  src={URL.createObjectURL(changeImage)}
                  alt="user profile"
                  className="userProfile"
                />
              ) : (
                <img
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt="user profile"
                  className="userProfile"
                />
              )}
              <input
                type="file"
                onChange={(e) => setChangeImage(e.target.files[0])}
                style={{ display: "none" }}
                name="profilePicture"
                id="profilePicture"
              />
              <label htmlFor="profilePicture" className="uploadLabel">
                Upload
              </label>
            </div>
          </div>
          <div className="get_details">
            <div className="name">
              <p>Full Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="company">
              <p>Address</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="phone">
              <p>Phone Number</p>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="company_location">
              <p>Distribution Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="registration number">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="car_details">
              <p>Password</p>
              <input
                type={showHide ? "text" : "password"}
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                className="eyeButton"
                onClick={() => setShowHide(!showHide)}
              >
                {showHide ? <FaRegEye /> : <FaRegEyeSlash />}{" "}
              </button>
            </div>
          </div>
          <div className="cancelAndSubmit">
            <button className="cancelForm" onClick={clearData}>
              Cancel
            </button>
            <button className="submitForm" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DistributerForm;
