const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const bycrypt = require("bcryptjs");

const branchSchema = new Schema({
    id: {
        type : String,
        required : true
    },
    name: {
        type: String,
        required: true
    },
})

const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    city: {
        type: String,
        required: false
    },
    username: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    branch : [branchSchema]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')){
        user.password = await bycrypt.hash(user.password, 8);
    }
})

module.exports = mongoose.model('Users', userSchema)