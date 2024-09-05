const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    rediretUrl: {
        type: String,
        required: true,
    },
    visitHistroy: [
        {
            timestamp: { 
                type: Number
            }
        }
    ]
}, { 
    timestamps: true
})

const URl = mongoose.model("shorturl", urlSchema);

module.exports = URl;