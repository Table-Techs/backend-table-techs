const Restaurant = require('../Models/Restaurant');
const { infoLog, errorLog } = require("../Services/Logger");

// create restaurant
exports.createRestaurant = async (req, res, next) => {
    try {
        const { name, address, phoneNumber, email } = req.body;

        infoLog('Creating new restaurant', req.body);
        const newRestaurant = new Restaurant({
            name,
            address,
            phoneNumber,
            email
        });

        const savedRestaurant = await newRestaurant.save();
        infoLog('Restaurant created successfully', { restaurant: savedRestaurant });
        res.status(201).json({ message: 'Restaurant created successfully', restaurant: savedRestaurant });
    } catch (error) {
        errorLog('Error creating restaurant', error);
        res.status(500).json({ message: 'Error creating restaurant', error });
    }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res, next) => {
    infoLog('Fetching all restaurants');
    try {
        const restaurants = await Restaurant.find();
        infoLog('Successfully fetched all restaurants', { count: restaurants.length });
        res.status(200).json({
            message: 'Restaurants fetched successfully!',
            restaurants
        });
    } catch (error) {
        errorLog('Error fetching restaurants', { error });
        res.status(500).json({
            message: 'Fetching restaurants failed!',
            error
        });
    }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res, next) => {
    const restaurantId = req.params.id;
    infoLog('Fetching restaurant by ID', { restaurantId });

    try {
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            infoLog('Restaurant not found.', { restaurantId });
            return res.status(404).json({
                message: 'Restaurant not found!'
            });
        }

        infoLog('Successfully fetched restaurant', { restaurant });
        res.status(200).json({
            message: 'Restaurant fetched successfully!',
            restaurant
        });
    } catch (error) {
        errorLog('Error fetching restaurant', { error, restaurantId });
        res.status(500).json({
            message: 'Fetching restaurant failed!',
            error
        });
    }
};

// Update restaurant by ID
exports.updateRestaurantById = async (req, res, next) => {
    const restaurantId = req.params.id;
    const updatedData = req.body; // The new data to update in the restaurant document

    try {
        infoLog('Updating restaurant', { restaurantId, updatedData });
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updatedData, {
            new: true, // Returns the updated document after update is applied
            runValidators: true, // Ensures validation rules are applied when updating
        });

        if (!updatedRestaurant) {
            infoLog('Restaurant not found.', { restaurantId, updatedData });
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        infoLog('Successfully updated restaurant.', { updatedRestaurant });
        res.status(200).json({
            message: 'Restaurant updated successfully',
            restaurant: updatedRestaurant,
        });
    } catch (error) {
        errorLog('Error updating restaurant', { error, restaurantId, updatedData });
        res.status(500).json({
            message: 'Failed to update restaurant',
            error: error.message,
        });
    }
};