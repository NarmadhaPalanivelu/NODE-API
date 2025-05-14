const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productmodel')
const app = express()

app.use(express.json())
//app.use(express.urlencoded({extended:false}))

app.listen(3000, () => {
    console.log('node api is running on port 3000');
})

// Routes
app.get('/', (req, res) => {
    res.send('hello node api');
})

app.get('/blog', (req, res) => {
    res.send('hello blog, my name is narmadha');
})
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})
//update
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// delete a product

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



mongoose.set('strictQuery', false)
// mongoose.connect('mongodb://0.0.0.0:27017/demoapi')
mongoose.connect('mongodb+srv://narmadhapalanivelu:l8gg9dPyoyRoCDRw@nodeapi.f4hcf4u.mongodb.net/nodeapi?retryWrites=true&w=majority&appName=nodeapi')
    .then(() => {
        console.log("connected to mongo db")
    }).catch((error) => {
        console.log(error)
    })
