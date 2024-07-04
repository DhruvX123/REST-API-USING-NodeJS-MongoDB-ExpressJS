const Item = require('../models/item');

// GET /items
// Pagination Implemented
// Search Functionality Implemented
exports.getAllItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build the search query
        const searchQuery = {};
        if (req.query.title) {
            searchQuery.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive search
        }
        if (req.query.authorOrDirector) {
            searchQuery.authorOrDirector = { $regex: req.query.authorOrDirector, $options: 'i' }; // Case-insensitive search
        }

        const items = await Item.find(searchQuery).skip(skip).limit(limit);
        const totalItems = await Item.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            totalItems,
            totalPages,
            currentPage: page,
            items
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /items/:id
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /items
exports.createItems = async (req, res) => {
    try {
        const items = await Item.insertMany(req.body);
        res.status(201).json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// PUT /items/:id
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE /items/:id
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
