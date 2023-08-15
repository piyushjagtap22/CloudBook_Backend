const mongoose = require('mongoose');
const { Schema } = mongoose;

// Mongoose Schema for User
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    phone: {type: String },
    googleAccount: { type: Boolean, default: false, required: true },
    timeStamp: { type: Date, default: Date.now },
    phoneVerified: { type: Boolean, default: false, required: true },
    emailVerified: { type: Boolean, default: false, required: true }

});
const User = mongoose.model('user', UserSchema);

module.exports = User;