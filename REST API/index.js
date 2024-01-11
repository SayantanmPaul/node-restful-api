const express=require('express')
const userData=require('./MOCK_DATA.json')
const app=express()
const PORT=8001

app.get('/api/users', (req, res)=>{
    return res.json(userData)
})

app.route('/api/users/:id')
.get((req, res)=>{
    const id=Number(req.params.id)
    const user=userData.find(user=>user.id===id)
    return res.json(user)
})
.post((req, res)=>{ 
    return res.json({status: "to be completed"})
})

.patch((req, res)=>{ 
    return res.json({status: "to be completed"})
})

.delete((req, res)=>{ 
    return res.json({status: "to be completed"})
})


app.listen(PORT, ()=>{
    console.log(`server active on port: ${PORT}`);
})