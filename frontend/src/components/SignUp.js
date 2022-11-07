import "./SignUp.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/'); 
        }
    },[]);

    const signUpData = async () => {
        console.log("Name-->", name);
        console.log("Email-->", email);
        console.log("Password-->", password);

        let res = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }, 
        })

        res = await res.json();
        console.log(res);
        
        // localstorage
        localStorage.setItem("user", JSON.stringify(res.result));
        localStorage.setItem("token", JSON.stringify(res.auth));

        if(result){
            navigate("/"); 
        }
    }

    return(
        <div className='signup-block'>
            <div className='signUp-container'>
                <h1>Sign Up</h1>
                <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
                <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
                <input className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                <button onClick={signUpData} className='signUpBtn'>Sign Up</button>
            </div>
        </div>
    );
}

export default SignUp;