require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter");
const app = express();
const port = 3000;

// db connection

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to DB...")
    app.listen(port);
    console.log("listening to port 3000");
}).catch((err)=>{
    console.log("db error -> "+err);
});



app.use(express.json());



// app.get("/", (req, res) => {
//   res.json({ msg: "Business Card APP" });
// });

//apis
// http://localhost:3000/api/v1/users/getAllUsers - get
// http://localhost:3000/api/v1/users/getUser/:id -> get
// http://localhost:3000/api/v1/users/addUser  -> post
app.use("/api/v1/users",userRouter);


app.use((err,req,res,next)=>{
    res.json({error:"INternal server error"});
});