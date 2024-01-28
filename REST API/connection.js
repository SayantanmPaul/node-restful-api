const mongoose=require('mongoose')


async function mongooseConnection(link){
    return mongoose.connect(link)
}

module.exports={
    mongooseConnection
}