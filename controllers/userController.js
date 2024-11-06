const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../middlewares/jwt.js");

// Register a new user
const registerUser = async (req, res) => {
    const { email, password, interests = [] } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        const newUser = new User({ email, password, interests });

        await newUser.save();

        const { accessToken, refreshToken } = generateTokens(newUser);

        return res.status(201).json({
            message: "User registered successfully",
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};


// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'Strict'
        });

        return res.status(200).json({
            message: 'Login successful',
            accessToken,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('accessToken'); 
    res.clearCookie('refreshToken'); 

    return res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = { registerUser, loginUser, logoutUser };
