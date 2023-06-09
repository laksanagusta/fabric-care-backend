const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    unit: {
        type : String,
        required : true
    },
    unitPrice: {
        type: Number,
        required : true
    }
});

module.exports = mongoose.model('Service', serviceSchema)