const express=require('express')
const {handleGetAllUSers,handleGetUserbyID, handleUpdateUserbyID, handleDeleteUserbyID, handleCreateNewUserbyID} =require('../controllers/users')
const router=express.Router()


//get the all user info in this route
router.route('/')
    .get(handleGetAllUSers)
//add new user via post req
    .post(handleCreateNewUserbyID)

//get the individual user via matching user id
router
    .route('/:id')
    .get(handleGetUserbyID)

// update data via patch request
.patch(handleUpdateUserbyID)

// delete data via delete request
.delete(handleDeleteUserbyID)


module.exports=router