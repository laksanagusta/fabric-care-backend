const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const quoteSchema = new Schema({
    service_id: {
        type : String,
        required : true
    },
    qty: {
        type : Number,
        required : true
    },
    subtotal: {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Quote', quoteSchema)