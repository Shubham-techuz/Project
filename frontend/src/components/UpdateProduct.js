import "./UpdateProduct.css";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    } 

    const updateProductData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put", 
            body: JSON.stringify({name, price, category, company}),
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return(
        <div className='updateProduct-block'>
            <div className='updateProduct-container'>
                <h1>Update Product</h1>
                <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
                {/* {error && !name && <span className="error">Enter valid name</span>} */}
                <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
                {/* {error && !price && <span className="error">Enter valid price</span>} */}
                <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
                {/* {error && !category && <span className="error">Enter valid category</span>} */}
                <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
                {/* {error && !company && <span className="error">Enter valid company</span>} */}
                <button onClick={updateProductData} className='updateProductBtn'>Update Product</button>
            </div>
        </div>
    );
}

export default UpdateProduct;