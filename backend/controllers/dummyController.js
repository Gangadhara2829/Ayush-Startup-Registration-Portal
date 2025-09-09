const User = require('../models/User');

// Dummy Register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dummy Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    // For Phase-2 demo, just return success
    res.status(200).json({ message: `Logged in as ${email}` });
};
