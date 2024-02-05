// Function to extract JWT token from the Authorization header in the HTTP request.
const getTokenFromHeader = (req) => {
    // Check if Authorization header exists
    if (req.headers["authorization"] !== undefined) {
      const token = req.headers["authorization"].split(" ")[1];
      return token; // Return the extracted token
    } else {
      return { status: "failed", msg: "no token in the header" }; // Return failure object
    }
  };
  
  // Export the function for external use
  module.exports = {
    getTokenFromHeader,
  };
  