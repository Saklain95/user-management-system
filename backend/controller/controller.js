const userModel = require('../model/userSchema.js');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 


const signup = async (req, res) => {
    const { name, email, bio, skills, experience, education, password, confirmPassword } = req.body;

    if (!name || !email || !bio || !skills || !experience || !education || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Please fill all the required fields",
            success: false
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match",
            success: false
        });
    }

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            message: "Invalid email format",
            success: false
        });
    }

    // Normalize the email (remove spaces)
    const emailNormalized = email.trim().toLowerCase();

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email: emailNormalized });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Create a new user object
        const userInfo = new userModel({
            name,
            email: emailNormalized,
            bio,
            skills,
            experience,
            education,
            password
        });

        // Save user
        const result = await userInfo.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result
        });
    } catch (e) {
        console.error('Error during signup:', e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = user.jwtToken();  // Ensure jwtToken method exists
        user.password = undefined;  // Remove password from the response

        const cookieOptions = {
            httpOnly: true,
            maxAge:  24 * 60 * 60 * 1000,  // 24hrs
        };

        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: user
        });
    } catch (e) {
        console.error('Signin error:', e);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await userModel.findById(userId);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOptions);
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
};

const forgotPassword = async (req, res, next) => {
    const email = req.body.email;
  
    // return response with error message If email is undefined
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
  
    try {
      // retrieve user using given email.
      const user = await userModel.findOne({
        email
      });
  
      // return response with error message user not found
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user not found 🙅"
        });
      }
  
      // Generate the token with userSchema method getForgotPasswordToken().
      const forgotPasswordToken = user.getForgotPasswordToken();
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        token: forgotPasswordToken
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirmPassword are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm Password do not match ❌",
    });
  }

  // Use crypto.createHash for hashing the token
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await userModel.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token or token has expired",
      });
    }

    user.password = password;
    await user.save();
    // console.log(user.password);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
    signup,
    signin,
    getUser,
    logout,
    forgotPassword,
    resetPassword
}