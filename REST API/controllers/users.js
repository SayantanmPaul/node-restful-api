const UserModel= require('../models/model')

async function handleGetAllUSers(req, res){
    res.setHeader('X-Dyson', 'Sayantan Paul') //custom header
    //always add X to custom headers- good practice 

    const allDBusers=await UserModel.find({})
    return res.json(allDBusers)
}


async function handleGetUserbyID(req, res){
    const user=await UserModel.findById(req.params.id)
    if(user){
        return res.json(user)
    }
    return res.status(404).json({status:"user not found"})
}

async function handleCreateNewUserbyID(req, res){
    const body=req.body
    if(!body || !body.first_name 
        || !body.last_name 
        || !body.email
        || !body.gender 
        || !body.job_title
    ) return res.status(400).json({status: "kindly fill all the queries"})
    //update the json file
    const userform=await UserModel.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log(userform);
    return res.status(200).json({status: "form submitted ", id: userform.id})

}

async function handleUpdateUserbyID(req, res){
    const body=req.body
    const user=await UserModel.findByIdAndUpdate(req.params.id, {
        first_name: body.first_name,
        last_name: body.last_name,
        job_title: body.job_title
    })
    return res.json({status: 'your data has been updated', id: user.id })
}
async function handleDeleteUserbyID(req, res){
    await UserModel.findByIdAndDelete((req.params.id))
    return res.json({status: 'your data has been deleted', id: id})
}

module.exports={
    handleGetAllUSers,
    handleGetUserbyID,
    handleUpdateUserbyID,
    handleDeleteUserbyID,
    handleCreateNewUserbyID
}