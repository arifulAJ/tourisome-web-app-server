const express = require("express");
const  app=express();
const port=process.env.PORT || 5000 ;
// user= tourisome-web 
// pass= 7sbZNjzrB2KMzwAY

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tourisome-web:7sbZNjzrB2KMzwAY@cluster0.lreh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("hitting the  database");
  // perform actions on the collection object
  client.close();
});


app.get("/" ,(req,res)=>{
    res.send("running curd out")
});
app.listen(port,()=>{
    console.log("running on port",port);
})
