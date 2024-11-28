const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    img_url: { type: String },
    availability: { type: Boolean, default: true }
});

const categorySchema = new Schema({
    name: { type: String, required: true },
    items: [itemSchema]  // Array of items within each category
});

const menuSchema = new Schema({
    restaurant: { type: Types.ObjectId, ref: 'Restaurants', required: true },  // Reference to Restaurants
    categories: [categorySchema],  // Array of categories
    bannerImage: { type: String }
});

// Create the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
