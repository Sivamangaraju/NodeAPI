const express= require('express')
const mongoose= require('mongoose')
const Product = require('./models/productModel')
const app=express()

app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send("Welcome back Again for your Journey")
})
app.get('/status',(req,res)=>{
    res.send(" Server Is running no worries")
})
app.get('/products',async(req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//get specific product based on id
app.get('/products/:name',async(req,res)=>{
    try {
        const {name}=req.params;
        const product= await Product.find({"name":name});
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//update data in database
app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            res.status(404).json({message:"cannot find any product with given id"})
        }
        const updatedProduct= await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }

})
//delete the product
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:"cannot find any product with given id"})
        }
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




app.post('/products',async(req,res)=>{
    try {
        const product= await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://sivamangaraju:sivamani@dataserver.xmd5p.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DataServer')
.then(()=>{
    console.log("Mongoose Connected")
    app.listen(3000, ()=>{
        console.log("Node API is running in 3000 portS")
    })
}).catch((error)=>{
    console.log(console.error()
    )
})