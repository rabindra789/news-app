const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const jwtAuthMiddleware = (req, res, next) => {
    // Check if the Authorization header is present
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the JWT token from the Authorization header
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT tokens (Access token and Refresh token)
const generateTokens = (user) => {
    // Generate Access token (expires in 1 hour)
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Set your desired expiration for the access token
    );

    // Generate Refresh token (expires in 7 days)
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Set your desired expiration for the refresh token
    );

    return { accessToken, refreshToken };
};

// Middleware to refresh JWT access token using a refresh token
const refreshTokenMiddleware = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token found' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Optional: Add logic to verify if the refresh token matches the one stored in your DB/session

        // Assuming the user object can be created from the decoded payload
        const user = { _id: decoded.id, email: decoded.email };

        // Generate a new access token
        const { accessToken } = generateTokens(user);

        return res.json({ accessToken });
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
};

// Export the middleware and token generation function
module.exports = { jwtAuthMiddleware, generateTokens, refreshTokenMiddleware };
