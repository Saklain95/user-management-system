const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: [4, 'Username should be minimum characters of 4'],
        maxLength: [50, 'Username should be maximum characters of 50'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is needed'],
        unique: [true, 'User already exists with this email'],
        lowercase: true,
        trim: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address']
    },
    bio: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        min: 0,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false // Don't include password in query results by default
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: Date,
    }
}, {
    timestamps: true
});

// Pre-save hook for hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

// Method to generate JWT token
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this.id, email: this.email },
            process.env.SECRET,
            { expiresIn: '24h' },
        );
    },

    // Compare password method
    // comparePassword(password) {
    //     return bcrypt.compare(password, this.password);
    // },

      //userSchema method for generating and return forgotPassword token
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString('hex');
    //step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(forgotToken)
      .digest('hex');

    /// forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

    //step 2 - return values to user
    return forgotToken;
  },
};


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
