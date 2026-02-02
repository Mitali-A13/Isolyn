const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");


//REGISTER USER
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //Basic validation
    if (!username || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    // Type validation
    if (typeof password !== "string") {
      throw new AppError("Password must be a string", 400);
    }

    //Email format check (simple but effective)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format", 400);
    }

    //Password strength (basic)
    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters long", 400);
    }

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    //Hash password safely
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};


//LOGIN USER
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    if (typeof password !== "string") {
      throw new AppError("Password must be a string", 400);
    }

    //Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    //Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    //Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
