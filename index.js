const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();


const port = process.env.PORT ||  5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use (cors())
app.use (express.json())










const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.edrit7p.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();





    const database = client.db("carDoctor");
    const services =  database.collection ('AllService');

    app.get ('/services', async (req, res) => { 


        const cursor = services.find();

        const result = await cursor.toArray()

        res.send (result)





    })


    app.get ('/services/:id', async (req, res) => {



        const id = req.params.id;

        const query = { _id : new ObjectId (id) };


        const cursor = await services.findOne(query)


        res.send (cursor)





     })

     const bookingDb = client.db ('carDoctor').collection ('checkOut')




     app.post ('/checkOut', async (req, res) => {



      const body = req.body;

      const result = await bookingDb.insertOne(body);

      res.send (result)





      })



      app.get ('/checkOut', async (req, res) => {
        let  query = {}


       if (req.query?.email) {



        query = { email: req.query.email}
       }










        const cursor = bookingDb.find (query);

        const result = await cursor.toArray()

        res.send (result)
      })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {

    res.send ('Welcome to the Doctor ')

})















app.listen (port, (req, res) => { 


    console.log (" App listening on port " + port)
})