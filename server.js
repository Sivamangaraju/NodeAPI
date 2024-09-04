const express= require('express')

const app=express()

//routes
app.get('/',(req,res)=>{
    res.send("Hello Siva , this is  first APi and all the best for upcoming tutorials")
})

app.listen(3000, ()=>{
    console.log("Node API is running in 3000 portS")
})