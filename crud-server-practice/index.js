const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://abdullahabutasneem19:YpcBYZZKzqiz8rHk@cluster0.3jg0esu.mongodb.net/?retryWrites=true&w=majority";

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
    
    const database = client.db("bookDB");
    const bookCollection = database.collection("books");

    app.post('/books', async(req, res) => {
        const book = req.body;
        console.log("new boook", book);
        const result = await bookCollection.insertOne(book);
        res.send(result);
    })

    app.get('/books', async(req, res) => {
        const cursor = bookCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/books/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await bookCollection.findOne(query);
        res.send(result)
    })

    app.put('/books/:id', async(req, res) => {
        const id = req.params.id;
        const book = req.body;
        console.log("updated book: ", book);
        const query = {_id : new ObjectId(id)};
        const options = {upsert: true};
        const updateBook = {
            $set: {
              name: book.name,
              author: book.author
            }
        }
        const result = await bookCollection.updateOne(query, updateBook, options);
        res.send(result);
    })

    app.delete('/books/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await bookCollection.deleteOne(query);
        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    console.log("Hello server");
    res.send("Hello server in client");
})

app.listen(port, () => {
    console.log(`Server is active on port: ${port}`);
})