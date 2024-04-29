import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import "../css/Settings.css";

const Settings = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);


    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/user-info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success === true) {
                setUserInfo(data.user);
                setEditedUserInfo(data.user)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

const handleSubmit = async (e) => {
    console.log(editedUserInfo)
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/update-user-info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(editedUserInfo)
        });
        const data = await response.json();
        if (data.success === true) {
            setUserInfo(editedUserInfo);
            setIsEditing(false); 
        }
    } catch (error) {
        console.log(error);
    }
};
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const changePhoto=()=>{
        setIsPhotoChanged(true)
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]; // Assuming you only allow selecting one file
        setEditedUserInfo((prevState) => ({
          ...prevState,
          userPhoto: file, // Assuming your editedUserInfo object has a userPhoto property
        }));
        setIsPhotoChanged(true);

        //for displaying photo
        const photoURL = URL.createObjectURL(file);
        setPhotoURL(photoURL);
      };
      

    return (
        <>
            <Nav />
            <div className="settings-container">
                <h1>Settings</h1>
                <div className="user-details">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='user-setting-image'>
                            <img className='setting-photo'
                            src={photoURL ? photoURL : "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"}
                              alt="" />
                            <label htmlFor="userPhoto" onClick={changePhoto} className='change-setting'>Change Photo</label>
                            {isPhotoChanged && 
                            <div>
                                {/* <input type='file' id='userPhoto' name='userPhoto' onChange="" className='change-setting-1'></input> */}
                                <input
                                    type='file'
                                    id='userPhoto'
                                    name='userPhoto'
                                    onChange={(e) => handlePhotoChange(e)}
                                    className='change-setting-1'
                                    />

                                <button onClick={()=>{setIsPhotoChanged(false) || setPhotoURL("")}} className='change-setting-2'>Cancel</button>
                                </div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname">Username:</label>
                                <input type="text" id="fullname" name="fullname" onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Old Password:</label>
                                <input type="password" id="old-password" name="old-password"  onChange={handleInputChange} className='input--' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">New Password:</label>
                                <input type="password" id="new-password" name="new-password" onChange={handleInputChange} className='input--' autoComplete='off'/>
                            </div>
                            <button type="submit" className='profile-save-1'>Save</button>
                            <button type="button" className='profile-save-2'onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className="user-card">
                            <img className='setting-photo' 
                            src="https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                             alt="" />
                            <h2>{userInfo.fullname}</h2>
                            <p>Email:{userInfo.email}</p>
                            <p>Contact: {userInfo.phone}</p>
                            <p>Address: {userInfo.address}</p>
                            <button onClick={() => setIsEditing(true)} className='profile-save-edit'>Edit Profile </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Settings;
