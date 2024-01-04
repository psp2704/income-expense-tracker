const bcrypt = require('bcryptjs');
const User = require('../../model/users/userSchema');

const userRegister = async (req, res) =>{
  const {fullname, email, password} = req.body;

  const userFound = await User.findOne({email});
  try {
      if(userFound)
      res.json({
        msg : 'user aloready exists'
      });

      if(!fullname || !email || !password) {
        res.json({
          msg : 'all fields are required'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = await User.create({
        fullname,
        email,
        password : hashedPass
      });

      res.json({
        msg : "scucess",
        id: user._id
      })
  } catch (error) {
    res.json(error.message);
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