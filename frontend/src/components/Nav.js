import "./Nav.css"
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    console.log("auth---->", auth);

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div className="nav-block">
            { auth ? <div className="nav-container">
                <ul className="nav-ul"> 
                    <li><Link to="/">Home Page</Link></li> 
                    <li><Link to="/add">Add Product</Link></li>
                    {/* <li><Link to="/update">Update Product</Link></li>   */}
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
                <ul className="nav-ul">
                    <li><Link onClick={logout} to="/signup">Logout</Link></li>
                </ul>
            </div> : 
            <div className="nav-container">
                <img src={require("../assets/online-shop-high-resolution-color-logo.png")} alt='logo' className="logo"/>
                <ul className="nav-ul">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li> <Link to="/login">Login</Link></li>
                </ul>
            </div>
            }
        </div>
    ); 
}

export default Nav;

{/*-------->   <></>   ----> This is called fragmentation */}