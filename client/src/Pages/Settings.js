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
                setEditedUserInfo(data.user);
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
        e.preventDefault();
        if(editedUserInfo.oldPassword === editedUserInfo.newPassword){
            try {
                const formData = new FormData();
                formData.append('fullname', editedUserInfo.fullname);
                formData.append('email', editedUserInfo.email);
                formData.append('phone', editedUserInfo.phone);
                formData.append('address', editedUserInfo.address);
                formData.append('oldPassword', editedUserInfo.oldPassword);
                formData.append('newPassword', editedUserInfo.newPassword);
                formData.append('userPhoto', editedUserInfo.userPhoto); 
        
                const response = await fetch('http://localhost:4000/update-user-info', {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData 
                });
                const data = await response.json();
                console.log(data)
                if (data.success === true) {
                    setUserInfo(editedUserInfo);
                    setIsEditing(false);
                    
                }
            } catch (error) {
                console.log(error);
            }

        }else{
            alert("Incorrect Old Password")
        }
        
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const changePhoto = () => {
        setIsPhotoChanged(true);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setEditedUserInfo((prevState) => ({
            ...prevState,
            userPhoto: file, 
        }));
        setIsPhotoChanged(true);
    
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
                                <img
                                    className='setting-photo'
                                    src= {userInfo.photo ? `http://localhost:4000/${userInfo.photo}` : "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"}
                                    
                                    alt=""
                                />
                                <label htmlFor="userPhoto" onClick={changePhoto} className='change-setting'>Change Photo</label>
                                {isPhotoChanged && 
                                    <div>
                                        <input
                                            type='file'
                                            id='userPhoto'
                                            name='userPhoto'
                                            onChange={(e) => handlePhotoChange(e)}
                                            className='change-setting-1'
                                        />
                                        <button onClick={() => { setIsPhotoChanged(false); setPhotoURL("") }} className='change-setting-2'>Cancel</button>
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname">Username:</label>
                                <input type="text" id="fullname" name="fullname" value={editedUserInfo.fullname} onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={editedUserInfo.email} onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={editedUserInfo.phone} onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" value={editedUserInfo.address} onChange={handleInputChange} className='input--'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="old-password">Old Password:</label>
                                <input type="password" id="old-password" name="oldPassword" onChange={handleInputChange} className='input--' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-password">New Password:</label>
                                <input type="password" id="new-password" name="newPassword" onChange={handleInputChange} className='input--' autoComplete='off'/>
                            </div>
                            <button type="submit" className='profile-save-1'>Save</button>
                            <button type="button" className='profile-save-2'onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div className="user-card">
                            <img
                                className='setting-photo'
                                src= {userInfo.photo ? `http://localhost:4000/${userInfo.photo}` : "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"}
                                alt=""
                            />
                            <h2>{userInfo.fullname}</h2>
                            <p>Email: {userInfo.email}</p>
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
