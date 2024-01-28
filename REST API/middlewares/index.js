const fs=require('fs')


function createLog(filename){
    return (req, res, next)=>{
        fs.appendFile(filename, `\naccessed at ${Date.now()}: on ${req.url} route and used ${req.method} method`,(err, data)=>{
            next()
        })
    }
}

module.exports={
    createLog
}