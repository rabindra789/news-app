const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../middlewares/jwt.js");

// Signup
const signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Create new user with hashed password
        const newUser = new User({ email, password });

        // Save the user, password will be hashed automatically due to the 'pre' hook
        await newUser.save();

        // Generate JWT tokens
        const { accessToken, refreshToken } = generateTokens(newUser);

        // Send success response with the generated tokens
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

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare the entered password with the stored hash using the instance method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Set refresh token in an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'Strict'
        });

        // Send the access token as part of the response
        return res.status(200).json({
            message: 'Login successful',
            accessToken,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// Logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

// Change Password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        if (!(await bcrypt.compare(currentPassword, user.password))) {
            return res
                .status(400)
                .json({ error: "Current password is incorrect" });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Password update failed" });
    }
};

// Get and Update Profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("savedArticles");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve profile" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { fullname, bio } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullname, bio },
            { new: true }
        );
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Profile update failed" });
    }
};

module.exports = {
    signup,
    login,
    logout,
    changePassword,
    getProfile,
    updateProfile,
};
