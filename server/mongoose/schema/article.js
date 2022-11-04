const mongoose = require("mongoose")

// validation코드도 넣을 수 있음 
const Article = new mongoose.Schema({
    content: { type: String, default: '', required: true },
    createdAt: {type: Date, default: Date.now, required: true}
})

module.exports = Article