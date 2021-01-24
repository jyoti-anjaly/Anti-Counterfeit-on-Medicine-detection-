const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();


const port = 3000;


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/signin",(req,res)=>{
    res.render("signin");
})


app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.get("/main",(req,res)=>{
    res.render("index");
})




app.listen(3000,()=>{
    console.log("The app is Listening at port  3000");
})