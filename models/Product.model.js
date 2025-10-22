import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: String,
    rating: Number,
    comment: String,
    comments: []
})

export const Product = mongoose.model('Product', productSchema)
