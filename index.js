const express = require("express");
const { MongoClient } = require('mongodb');
const  app=express();
require('dotenv').config()
const port=process.env.PORT || 5000 ;



const uri = "mongodb+srv://process.env.DB_USER:process.env.DB_PASS@cluster0.lreh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("hitting the  database colling the ");
  // perform actions on the collection object
  client.close();
});


app.get("/" ,(req,res)=>{
    res.send("running curd out")
});
app.listen(port,()=>{
    console.log("running on port",port);
})
