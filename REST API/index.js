const express=require('express')
const {createLog}= require("./middlewares")
const userRouter=require('./routes/user')
const {mongooseConnection}=require('./connection')

const app=express()
const PORT=8001

//connect to the database

mongooseConnection('mongodb://127.0.0.1:27017/sampleUsers').then(()=>console.log("mongodb connection success!"))
.catch((err)=>console.log("error occured:",err))

//middleware
app.use(express.json())

//custom middleware
app.use(createLog('useraccessdata.txt'))

//routes

app.use('/api/users', userRouter)


app.listen(PORT, ()=>{  
    console.log(`server active on port: ${PORT}`);
})