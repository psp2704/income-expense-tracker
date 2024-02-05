// Import the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');

// Function to generate a JWT token with the provided 'id'
const generateToken = (id) => {
    // Sign the token with the provided 'id', a secret key ('anykey'), and set an expiration time of 10 hours
    return jwt.sign({ id }, 'anykey', { expiresIn: '10h' });
};

// Export the function for external use
module.exports = {
    generateToken,
};
