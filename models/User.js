const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mongoose Schema for User
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },

});
const User = mongoose.model('user',UserSchema);

module.exports = User;