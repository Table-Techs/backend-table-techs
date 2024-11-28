const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },  // Restaurant name
    address: { type: String, required: true },  // Restaurant address
    phoneNumber: { type: String, required: true },  // Contact number
    email: { type: String },  // Restaurant email
    //   tables: [{ type: String }],  // List of table numbers in the restaurant
    //   menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],  // List of menu items associated with the restaurant
    //   manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Reference to the manager/owner of the restaurant
}, { timestamps: true });

module.exports = mongoose.model('Restaurants', restaurantSchema);