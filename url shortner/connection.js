const { mongoose } = require("mongoose");

const handleConnectToMongoDB= async(baseURl)=>{
  return mongoose.connect(baseURl)
}

module.exports = handleConnectToMongoDB;
