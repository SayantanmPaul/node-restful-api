const express=require('express')

const app=express()
const PORT=8001

app.get('/', (req, res)=>{
    res.end("root address activated")
})


app.listen(PORT, ()=>{
    console.log(`server active on port: ${PORT}`);
})