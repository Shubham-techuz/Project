import './Profile.css';
import React, { useEffect, useState } from 'react';

const Profile = () => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        console.log("userDetail=================>",JSON.parse(localStorage.getItem('user')));
        console.log("userDetail=================>",JSON.parse(localStorage.getItem('user')).name);
        console.log("userDetail=================>",JSON.parse(localStorage.getItem('user')).email);
        setUserName(JSON.parse(localStorage.getItem('user')).name);
        setUserEmail(JSON.parse(localStorage.getItem('user')).email);
    },[]);

    const updateProfile = () => {
        console.log("Update Btn Clicked");
    }

    return( 
        <div className='profile-block'>
            <div className="profile-container">
            <h1>User Profile</h1>
                <form>
                    <fieldset disabled={disable} className="form-feildset">
                        <input name='name' placeholder='Name' value={userName} className="inputBox" />
                        <input name='email' placeholder='Email' value={userEmail} className="inputBox" />
                        <button onClick={updateProfile} className='updateProfileBtn'>Update Profile</button>
                    </fieldset>
                </form>
            </div>
            <button onClick={() => setDisable(!disable)} className={`disableBtn ${disable ? "disableBtnInActive" : "disableBtnActive"}`}>{disable ? "Enable" : "Disable"}</button>
        </div>
    )
};

export default  Profile;




