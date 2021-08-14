const User = require('../models/User');
const { createToken } = require('../middlewares/auth_middleware');
let maxAge = 3600;

// @ROUTE post api/user/register
// @DESC Register new User
// @ACCESS user
// User registeration Proper
module.exports.addUser = async (req, res) => {
  const{ name, email, phone, password } = req.body;
  let user = await User.findOne({ email });

  try {
    if(user) return res.status(401).json({
      errors: [{ msg: 'User already exists'}],})

      // Create User Object
    user = new User({ name, email, password, phone });

    // Saving User 
    await user.save();
    
    // Creating the User Token with JWT
    let payLoad = ({
      id: user._id,
      email: user.email
    });

    const token = createToken(payLoad);

    // Inserting the created Token into cookie-Parser
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge : maxAge * 1000
    });

    res.status(200).json({
      user : user.name,
      token
    });
      
  } catch (error) {
    return res.status(500).json(error.message)
  }
};

// @ROUTE POST /api/user/login
// @DESC User login
// @ACCESS user
// User Login
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Creaating a user Object
    let user = await User.login(email, password)
    
    // Creating a Token
    let payLoad = ({ id: user._id, email: user.email });

    const token = createToken(payLoad);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge : maxAge * 1000
    });

    res.status(200).json({
      name: user.name,
      token
    });
    
  } catch (error) {
    return res.status(500).json(error.message)
  }
}