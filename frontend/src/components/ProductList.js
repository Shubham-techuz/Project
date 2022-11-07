import "./ProductList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/remove/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            alert("Record is deleted");
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
    }

    console.log("Product list----->", products);

    return(
        <div className="product-list-block">
            <h1>Product List</h1>
            <input type="text" placeholder="Search Product" className="searchInput"
                onChange={searchHandle}
            />
            <ul className="ul-products">
                <li className="li-products-heading">S. No</li>
                <li className="li-products-heading">Name</li>
                <li className="li-products-heading">Price</li>
                <li className="li-products-heading">Category</li>
                <li className="li-products-heading">Company</li>
                <li className="li-products-heading">Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item,index) => 
                    <ul className="ul-products">
                        <li className="li-products-list">{index+1}</li>
                        <li className="li-products-list">{item.name}</li>
                        <li className="li-products-list">${item.price}</li>
                        <li className="li-products-list">{item.category}</li>
                        <li className="li-products-list">{item.company}</li>
                        <li className="li-products-list">
                            <button onClick={() => deleteProduct(item._id)} className="delete-btn">
                                Delete
                            </button>
                            <Link to={`/update/${item._id}`} className="update-btn">Update</Link>
                        </li>
                    </ul>
                ) : 
                <h2>No Product Found</h2>
            }
        </div>
    )
};

export default ProductList;
