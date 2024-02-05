// Import the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');

// Function to verify a JWT token using the provided 'anykey'
const verifyToken = (token) => {
    // Verify the token using the 'anykey' and handle the result
    return jwt.verify(token, 'anykey', (err, decoded) => {
        // If an error occurs during verification, return false
        if (err) {
            return false;
        } else {
            // If verification is successful, return the decoded token payload
            return decoded;
        }
    });
};

// Export the function for external use
module.exports = {
    verifyToken,
};
