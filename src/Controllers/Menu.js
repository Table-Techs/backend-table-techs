const Menu = require('../Models/Menu');
const { infoLog, errorLog } = require("../Services/Logger");

// create menu
exports.createMenu = async (req, res, next) => {
    try {
        const { restaurant, categories, bannerImage } = req.body;

        infoLog('Creating new menu.', req.body);
        const newMenu = new Menu({
            restaurant,
            categories,
            bannerImage
        });

        const savedMenu = await newMenu.save();
        infoLog('Menu created successfully.', { menu: savedMenu });
        res.status(201).json({ message: 'Menu created successfully!', menu: savedMenu });
    } catch (error) {
        errorLog('Error creating menu.', error);
        res.status(500).json({ message: 'Error creating menu.', error });
    }
};

// Get all menus
exports.getAllMenus = async (req, res, next) => {
    infoLog('Fetching all menus.');
    try {
        const menus = await Menu.find();
        infoLog('Successfully fetched all menus.', { count: menus.length });
        res.status(200).json({
            message: 'Menus fetched successfully!',
            menus
        });
    } catch (error) {
        errorLog('Error fetching menus.', { error });
        res.status(500).json({
            message: 'Fetching menus failed!',
            error
        });
    }
};

// Get menu by restaurant id
exports.getMenuByRestaurantId = async (req, res, next) => {
    const restaurantId = req.query.restaurantId;
    infoLog('Fetching menu by restaurantId.', { restaurantId });

    try {
        const menu = await Menu.findOne({ restaurant: restaurantId });

        if (!menu) {
            infoLog('Menu not found.', { restaurantId });
            return res.status(404).json({
                message: 'Menu not found!'
            });
        }

        infoLog('Successfully fetched Menu.', { menu });
        res.status(200).json({
            message: 'Menu fetched successfully!',
            menu
        });
    } catch (error) {
        errorLog('Error fetching menu.', { error, restaurantId });
        res.status(500).json({
            message: 'Fetching menu failed!',
            error
        });
    }
};

// Update menu by ID
exports.updateMenuById = async (req, res, next) => {
    const menuId = req.params.id;
    const updatedData = req.body; // The new data to update in the restaurant document

    try {
        infoLog('Updating menu.', { menuId, updatedData });
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updatedData, {
            new: true, // Returns the updated document after update is applied
            runValidators: true, // Ensures validation rules are applied when updating
        });

        if (!updatedMenu) {
            infoLog('Menu not found.', { menuId, updatedData });
            return res.status(404).json({ message: 'Menu not found.' });
        }

        infoLog('Successfully updated menu.', { updatedMenu });
        res.status(200).json({
            message: 'Menu updated successfully',
            menu: updatedMenu,
        });
    } catch (error) {
        errorLog('Error updating menu.', { error, menuId, updatedData });
        res.status(500).json({
            message: 'Failed to update menu.',
            error: error.message,
        });
    }
};