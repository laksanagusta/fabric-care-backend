const mongoose = require("mongoose");
const { Schema } = mongoose;

const rackSchema = new Schema({
    name: {
        type : String,
        required : false
    },
    code: {
        type : String,
        required : true
    },
    capacity: {
        type : String,
        required : true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Rack', rackSchema)