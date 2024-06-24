import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to Delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong , cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    //setp -1 :retrive appointments from booking
    const bookings = await Booking.find({ user: req.userId });

    //setp -2 :retrive doctor ids from appointments booking
    const doctorIds = bookings.map((el) => el.doctor.id);

    //step -3 :retrive doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "Appointment are getting",
      data: doctors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something  went wrong, cannot get" });
  }
};
export const getCartDetails = async (req, res) => {
  const userId = req.userId; // Assuming userId is extracted from the request

  try {
    // Retrieve the user from the database along with the cart details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Extract the cart details from the user object
    const cartDetails = user.cart;
    res.status(200).json(cartDetails);
  } catch (error) {
    console.error("Error retrieving cart details:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving cart details",
      error: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  const userId = req.userId; // Assuming you have middleware to extract user ID from the request
  const { productName, quantity, price, productphoto } = req.body; // Include productName in the request body

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the product already exists in the cart
    const existingProduct = user.cart.find(
      (item) => item.productName === productName
    );

    if (existingProduct) {
      return res.status(201).json({
        success: false,
        message: "Product already exists in the cart",
      });
    }

    // Create a new cart item object
    const cartItem = {
      productphoto,
      productName,
      quantity,
      price,
    };

    // Add the new cart item to the user's cart
    user.cart.push(cartItem);

    // Save the updated user object to the database
    await user.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: user.cart, // Return updated cart details
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

export const addtocheckup = async (req, res) => {
  const userId = req.userId;
  const { checkupname, price, date, time } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .josn({ success: false, message: "User Not found" });
    }
    const existingProduct = user.Checkup.find(
      (item) => item.checkupname == checkupname
    );
    if (existingProduct) {
      return res
        .status(405)
        .json({ success: false, message: "Already booked" });
    }
    const checkup = {
      checkupname,
      price,
      date,
      time,
    };
    user.Checkup.push(checkup);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Booked checkout now",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Booking to checkup",
      error,
    });
  }
};

export const deletecart = async (req, res) => {
  const userId = req.userId;
  const productId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist" });
    }
    const deleting = user.cart.find(
      (item) => item._id.toString() === productId
    );
    if (!deleting) {
      return res.status(402).json({ success: false, message: "Not Found" });
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== productId);

    await user.save();

    res.status(200).json({ success: true, message: "Remove from the cart" });
  } catch (error) {
    res
      .status(405)
      .json({ success: false, message: "Error deleting the item", error });
  }
};

export const updatequantity = async (req, res) => {
  const userID = req.userId;
  const productId = req.params.id;
  const { quantity } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
    }
    const product = user.cart.id(productId);
    if (!product) {
      res.status(403).json({ success: false, message: "Proudct not found" });
    }
    product.quantity = parseInt(quantity, 10);
    const result = product.quantity;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Updated the quantity", result });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error In The Server.", error });
  }
};
