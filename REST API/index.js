const express=require('express')
const userData=require('./MOCK_DATA.json')
const fs=require('fs')
const app=express()
const PORT=8001

//middleware
app.use(express.json())

//get the all user info in this route
app.get('/api/users', (req, res)=>{
    return res.json(userData)
})

//add new user via post req
app.post('/api/users', (req, res)=>{
    const body=req.body
    userData.push({...body, id: userData.length+1});
    //update the json file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(userData), (err, data)=>{
        res.json({status: 'your id has been generated', id: userData.length })
    })
})

//get the individual user via matching user id
app.route('/api/users/:id')
.get((req, res)=>{
    const id=Number(req.params.id)
    const user=userData.find(user=>user.id===id)
    return res.json(user)
})

// update data via patch request
.patch((req, res)=>{  
    const id=Number(req.params.id)
    const user=userData.find(user=>user.id===id)
    if(user){
        Object.assign(user, req.body)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(userData), (err, data)=>{
            return res.json({status: 'your data has been updated', id: user.id })
        })
    }else  return res.json({err: `error occoured`})
})

// delete data via delete request
.delete((req, res)=>{ 
    const id=Number(req.params.id)
    const userIndex=userData.findIndex(user=>user.id===id)
    if(userIndex!==-1){
        userData.splice(userIndex, 1)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(userData), (err, data)=>{
            return res.json({status: 'your data has been deleted', id: id})
        })
    }
    else return res.json({status: "not found"})
})


app.listen(PORT, ()=>{  
    console.log(`server active on port: ${PORT}`);
})