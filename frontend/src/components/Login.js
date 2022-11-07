import "./Login.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/'); 
        }
    },[]);

    const loginData = async () => {
        console.log("Email-->", email);
        console.log("Password-->", password);

        // The result below is read-stream so we have to convert it into the json.
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }, 
        }) 

        result = await result.json();
        console.log(result);
        
        if(result.auth){
            // localstorage
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/"); 
        }else{
            alert("Please enter correct details");
        }

    }

    return(
        <div className='login-block'>
            <div className='login-container'>
                <h1>Login</h1>
                <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
                <input className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                <button onClick={loginData} className='loginBtn'>Login</button>
            </div>
        </div>
    );
}

export default Login;