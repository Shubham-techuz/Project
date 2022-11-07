import "./AddProduct.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPricel] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    // useEffect(()=>{
    //     const auth = localStorage.getItem('user');
    //     if(auth){
    //         navigate('/'); 
    //     }
    // },[]);

    const addProductData = async () => {
        console.log("Name-->", name);
        console.log("price-->", price);
        console.log("category-->", category);
        console.log("company-->", company);

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }else{
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            console.log(userId);
    
            let result = await fetch('http://localhost:5000/add_product', {
                method: 'post',
                body: JSON.stringify({name, price, category, company, userId}),
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    'Content-Type': 'application/json'
                }, 
            })
    
            result = await result.json();
            console.log(result);
            if(result){
                navigate("/"); 
            }
        }

        
        // localstorage
        // localStorage.setItem("user", JSON.stringify(result));

    }

    return(
        <div className='addProduct-block'>
            <div className='addProduct-container'>
                <h1>Add Product</h1>
                <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
                {error && !name && <span className="error">Enter valid name</span>}
                <input className="inputBox" value={price} onChange={(e) => setPricel(e.target.value)} type="text" placeholder="Enter Product Price" />
                {error && !price && <span className="error">Enter valid price</span>}
                <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
                {error && !category && <span className="error">Enter valid category</span>}
                <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
                {error && !company && <span className="error">Enter valid company</span>}
                <button onClick={addProductData} className='addProductBtn'>Add Product</button>
            </div>
        </div>
    );
}

export default AddProduct;
