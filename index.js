const express = require("express")
 const app = express()
 const port = process.env.PORT || 3000 
 const ejs = require('ejs')
 const dotenv = require('dotenv')
   dotenv.config()

 app.set("view engine", "ejs")

 app.get('/index', (req, res)=>{
      res .render("index", {message: "Are you there"})
 })
 
 app.get('/signin', (req, res)=>{
      res .render("signin", {gender: "Female"})
 })
 app.get('/signup', (req, res)=>{
      res .render("signup", {gender: "Male"})
 })
 app.get('/dashboard', (req, res)=>{
      res .render("dashboard", {gender: "Male"})
 })
 let allStudents =[
    { id:"1", name:"john",Age:20},
    { id:"2", name:"Felix",Age:24},
    { id:"3", name:"d0e",Age:65},
 ]
//  app.get("/", (req, res)=>{
//     res.send(allStudents)
//  })
//  app.get("/",(req, res)=>{
//     res.send("Morning")
//  })
 app.get("/good",(req, res)=>{
    res.sendFile(__dirname + "/index.html")
 })

//  app.listen(portnumber,callback function)
app.listen(port,(err)=>{
    // console.log("App is running on port 3000");
    if (err) {
        console.log("Error occurrred while starting the server",err);
        
    } else {
        console.log("App is running on port 3000");
        
    }
})
