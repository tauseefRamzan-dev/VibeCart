const mongoose = require("mongoose")
const { Schema } = mongoose;

const scehma = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number,required: true},
    category: {type: String, required: true},
    stockQuantity: {type: Number, required: true},
    image: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
    rating:{
        count: {type: Number, default: 0},
        rate: {type: Number, default: 0, min:0,max:5}
    },
}, { timestamps: true });

const products = mongoose.model('products', scehma);
module.exports = products