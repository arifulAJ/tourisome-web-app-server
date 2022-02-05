const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const cors=require('cors');
const  app=express();
require('dotenv').config()
const port=process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lreh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try{
    await client.connect();
    const database = client.db("tour-agency");
    const userCollection = database.collection("users");
    const hotelCollection = database.collection("hotels");

  // post api 
  app.post('/users',async(req,res)=>{
const user=req.body;
const result= await userCollection.insertOne(user)
res.json(result);



  });
  //  put api
  app.put('/users',async(req,res)=>{
    const user=req.body;
    
    const filter={email:user.email};
    const options = { upsert: true };
    const updateDoc={$set:{user}};
   
    const result=await userCollection.updateOne(filter,updateDoc,options);
    res.json(result);
  });
  // post api 
  app.post('/hotels',async(req,res)=>{
    const hotel=req.body;
    const result=await hotelCollection.insertOne(hotel);
    res.json(result);
   
  });
  // app get 
  app.get('/hotels',async(req,res)=>{
  
    const cursor= hotelCollection.find({});
    const result=await cursor.toArray();
    res.send(result)

  });
  // get api 
  app.get('/hotels/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: ObjectId(id)};
    const result=await hotelCollection.findOne(query);
   
    res.send(result);
  })
    

  }
  catch{
    //  await client.close();
  }

}
run().catch(console.dir)



app.get("/" ,(req,res)=>{
    res.send("running curd out and ")
});
app.listen(port,()=>{
    console.log("running on port promote the ",port);
})
