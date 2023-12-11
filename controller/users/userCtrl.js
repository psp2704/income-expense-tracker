
const userRegister = async (req, res) =>{
    try {
        res.send({msg : "user register"})
    } catch (error) {
        console.log(error)
    }
};

//user login
const userLogin = async (req, res) =>{
    try {
        res.send({msg : "user login"})
    } catch (error) {
        console.log(error)
    }
};


//get single user profile
const getUserProfile = async (req, res) =>{
    try {
        res.send({msg : "get the user"})
    } catch (error) {
        console.log(error)
    }
};

// update the user
const updateUser =  async (req, res) => {
    try {
      res.send({ msg: "find/update the user" });
    } catch (error) {
      console.log(error);
    }
  };

//delete user 
const deleteUser = async (req, res) => {
    try {
      res.send({ msg: "delete the user" });
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    userRegister,
    userLogin,
    getUserProfile,
    updateUser,
    deleteUser,
}