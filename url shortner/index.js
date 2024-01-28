const express= require('express')

const router=express.Router()

const app=express();
const PORT=3000

app.listen(PORT, ()=>{
    console.log("port is enebled at ", PORT);
})