const User = require('../models/userModel.js');

const getInterests = (req, res) => {
    const availableInterests = ["Sports", "Technology", "Health", "Politics"];  // Example interests
    res.json({ interests: availableInterests });
};

const saveInterests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.interests = req.body.interests;
        await user.save();
        res.json({ message: 'Interests saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save interests' });
    }
};

const updateInterests = saveInterests;  // Reusing the save logic for update

module.exports = { getInterests, saveInterests, updateInterests };
