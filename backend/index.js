const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./schemas/User');
const Product = require('./schemas/Product');
const Jwt = require('jsonwebtoken'); 
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req,res) => {
    // res.send("app is working....");
    // res.send(req.body);

    let user = new User(req.body);
    let result = await user.save();
    // removes password in response
    result = result.toObject();
    delete result.password;
    //---------
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if(err){
            res.send({result: 'Somethinng went wrong, Please try after some time.'});
        }
        res.send({ result, auth: token });
    }); 
});

app.post("/login", async (req,res) => {
    // res.send("app is working....");
    // res.send(req.body);
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password"); //removes password in response
        if(user){
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if(err){
                    res.send({result: 'Somethinng went wrong, Please try after some time.'});
                }
                res.send({ user, auth: token });
            });  
        }else{
            res.send({result: 'No User Found'});
        }
    }else{
        res.send({result: 'No User Found'});
    }
});


app.post("/add_product", verifyToken, async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});


app.get("/products", verifyToken, async (req,res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result: "No Products found"});
    }
});

app.get("/product/:id", verifyToken, async (req,res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result: "No Product found"});
    }
});

app.delete("/product/remove/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
}); 

app.put("/product/:id", verifyToken, async (req,res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
             $set: req.body
        }
    )
    res.send(result);
});

app.get("/products", verifyToken, async (req,res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result: "No Products found"});
    }
});

app.get("/search/:key", verifyToken, async (req,res) => {
    let result = await Product.find({
        "$or": [
            {name: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {company: {$regex: req.params.key}}
        ]
    });
    res.send(result);
});


// MIDDLEWARE

function verifyToken(req, res, next){
    let token = req.headers['authorization'];
    console.log(token);
    if(token){
        token = token.split(' ')[1];
        console.log("Middleware called--->", token);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({result: "Please provide valid token"});
            }else{
                next();
            }
        });
    }else {
        res.status(403).send({result: "Please add token with header"});
    }
}


app.listen(5000);


// To resolve the issue of CORS
// install (npm i cors) 