const mongoose= require('mongoose')

//mongoose schemas
const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    job_info:{
        type: String
    }
}, 
{
    timestamps: true
})

const UserModel=mongoose.model("userDetails",userSchema)

module.exports=UserModel