import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "120d",
    }
  );
};
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender, username } = req.body;
  try {
    let user = null;
    let check_add = null;

    // Check if the user already exists based on the role
    if (role === "patient") {
      user = await User.findOne({ email });
      check_add = await User.findOne({ username });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
      check_add = await Doctor.findOne({ username });
    }

    if (check_add) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object based on the role
    if (role === "patient") {
      user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        username,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    // Save the user to the database
    await user.save();
    console.log(user);
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error, please try again",
      });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user);

    const {
      password: userPassword,
      role,
      appointment,
      ...userData
    } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...userData },
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
