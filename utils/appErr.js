// Function to create an application-specific error with a custom message and status code.
const appErr = (message, statusCode) => {
    // Create a new Error object with the provided message
    let error = new Error(message);
    // Set the status code for the error
    error.statusCode = statusCode;
    return error; // Return the created error object
};

// Export the function for external use
module.exports = {
    appErr,
};
