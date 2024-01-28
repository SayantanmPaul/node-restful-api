const express=require("express")
const mongoose=require('mongoose')

//mongodb connections
mongoose.connect('mongodb://127.0.0.1:27017/usermodel')
.then(console.log("database is active"))
.catch((err)=>console.log("error: ", err))

const userModel=mongoose.model("userdetails",userInfo)

const app=express()
const PORT=3002

//express middleware
app.use(express.json())

//get route
app.route('/api/info')
.get(async(req,res)=>{
    const allUSer= await userModel.find({})
    res.json(allUSer)
})  

//post route
.post(async(req,res)=>{
    const body=req.body
    if(!body || !body.first_name ||!body.last_name ||!body.email || !body.job_info) return res.status(400).json({status: 'fill the details'})
    const form= await userModel.create({
        first_name: body.first_name ,
        last_name: body.last_name,
        email: body.email,
        job_info: body.job_info
    })
    console.log(form);
    return res.json({status: 'form submitted'})
})

//patch route

app.route('/api/info/:id')
.patch(async(req,res)=>{
    const form=await userModel.findByIdAndUpdate(req.params.id, {
        first_name: body.first_name ,
        last_name: body.last_name,
        job_info: body.job_info
    })
    console.log(form);
    return res.json({status: 'form re updated', id: form.id})
})

//delete route

.delete(async(req,res)=>{
    const id=req.params.id;
    const user=await userModel.findById(id)
    if(user){
        await userModel.findByIdAndDelete(req.params.id)
        return res.json({status: 'data deleted', id: req.params.id})
    }
    else return res.json({status: 'id not found', id: req.params.id})
})

//porting
app.listen(PORT, (err, data)=>{
    console.log(`serivce running on port ${PORT}`);
})