const mongoose = require("mongoose")

const Author = new mongoose.Schema({
    // author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"}
    nickname: { type: String, default: '', required: true, unique: true },
    hashedPassword: {type: String, required: true}
})

module.exports = Author