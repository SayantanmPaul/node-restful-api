const express=require('express')
const mongoose=require("mongoose")
const fs=require('fs')
const app=express()
const PORT=8001

//connect to the database

mongoose.connect('mongodb://127.0.0.1:27017/sampleUsers')
.then(console.log("database connected"))
.catch((err)=>console.log("error occured", err))

//schemas
const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    gender:{
        type: String,
    },
    job_title: {
        type: String,
        require: true
    },  
}, {
    timestamps: true
})

const UserModel=mongoose.model("userDetails",userSchema)

//middleware
app.use(express.json())

//custom middleware
app.use((req, res, next)=>{
    fs.appendFile('log.txt', `\naccessed at ${Date.now()}: on ${req.url} route and used ${req.method} method`,(err, data)=>{
        next()
    })

})

//get the all user info in this route
app.get('/api/users', async (req, res)=>{
    res.setHeader('X-Dyson', 'Sayantan Paul') //custom header
    //always add X to custom headers- good practice 

    const allDBusers=await UserModel.find({})
    return res.json(allDBusers)
})

//add new user via post req
app.post('/api/users', async (req, res)=>{
    const body=req.body
    if(!body || !body.first_name ||!body.last_name ||!body.email|| !body.gender ||!body.job_title) return res.status(400).json({status: "kindly fill all the queries"})
    //update the json file
    const userform=await UserModel.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(userform);
    return res.status(200).json({status: "form submitted "})

})

//get the individual user via matching user id
app.route('/api/users/:id')
.get( async(req, res)=>{

    const user=await UserModel.findById(req.params.id)
    if(user){
        return res.json(user)
    }
    return res.status(404).json({status:"user not found"})
})

// update data via patch request
.patch(async(req, res)=>{  
    const body=req.body
    const user=await UserModel.findByIdAndUpdate(req.params.id, {
        first_name: body.first_name,
        last_name: body.last_name,
        job_title: body.job_title
    })
    return res.json({status: 'your data has been updated', id: user.id })
})

// delete data via delete request
.delete(async(req, res)=>{ 
    await UserModel.findByIdAndDelete((req.params.id))
    return res.json({status: 'your data has been deleted', id: id})
})

app.listen(PORT, ()=>{  
    console.log(`server active on port: ${PORT}`);
})