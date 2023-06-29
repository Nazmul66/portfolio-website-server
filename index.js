require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-tfmdlv0-shard-00-00.rnkzyeb.mongodb.net:27017,ac-tfmdlv0-shard-00-01.rnkzyeb.mongodb.net:27017,ac-tfmdlv0-shard-00-02.rnkzyeb.mongodb.net:27017/?ssl=true&replicaSet=atlas-8cmvoo-shard-0&authSource=admin&retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

const dbConnect = async () => {
    try {
      client.connect();
      console.log("Database Connected Successfully✅");
    } catch (error) {
      console.log(error.name, error.message);
    }
  };
dbConnect();
  
  const projectCollection = client.db("Personal-portfolio").collection("project");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/projects", async(req, res) =>{
     const result = await projectCollection.find().toArray();
     res.send(result);
})
app.get("/projects/:id", async(req, res) =>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await projectCollection.findOne(query);
    res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})