import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import { Stripe } from "stripe";

export const createBooking = async (req, res) => {
  const userId = req.userId;
  const doctorId = req.params.id;
  const { meeting, ticketPrice, appointmentDate, isPaid, time } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const newBooking = new Booking({
      user: user._id,
      doctor: doctor._id,
      ticketPrice,
      appointmentDate,
      isPaid,
      time,
      meeting,
    });

    await newBooking.save();

    // Optionally, add the booking to the user's and doctor's appointments arrays
    user.appointments.push(newBooking._id);
    doctor.appointments.push(newBooking._id);

    await user.save();
    await doctor.save();

    // Populate user and doctor fields in the new booking
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user", "name email") // Specify fields to include if necessary
      .populate("doctor", "name specialization hospital photo");

    res
      .status(200)
      .json({
        success: true,
        message: "Booking done",
        booking: populatedBooking,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error during booking", error });
  }
};

export const BookDoctor = async (req, res) => {
  const userId = req.userId;
  const booking = req.body
  const doctorId = req.params.id;
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch the doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SUCCESS_SITE_URL}`,
      cancel_url: `${process.env.CANCEL_SITE_URL}`,
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: booking.ticketPrice * 100,
            product_data: {
              name: booking.doctorName,
              description: booking.DoctorDescription,
              images: [booking.doctorPhoto],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Create a new booking
    const newBooking = new Booking({
      user: user._id,
      doctor: doctor._id,
      ticketPrice:booking.ticketPrice,
      appointmentDate:booking.appointmentDate,
      time:booking.time,
      meeting:booking.meeting,
    });

    await newBooking.save();

    // Optionally, add the booking to the user's and doctor's appointments arrays
    user.appointments.push(newBooking._id);
    doctor.appointments.push(newBooking._id);

    await user.save();
    await doctor.save();

    res.status(200).json({ success: true, message: "Session created", url: session.url });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating checkout session",
      error: error.message,
    });
  }
};

export const getUserBookingDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate({
      path: "appointments",
      populate: {
        path: "doctor", 
        select: "name specialization hospital photo", 
      },
      select: "doctor ticketPrice status isPaid appointmentDate meeting ",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Booking found",
      data: user.appointments, // Send populated appointments directly
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error during getting user booking details",
      error,
    });
  }
};
export const getDoctorBookingDetails = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId).populate({
      path: "appointments",
      populate: {
        path: "user", // Assuming 'doctor' is populated in Booking
        select: "name specialization hospital photo", // Select fields to populate from doctor
      },
      select: "user ticketPrice status isPaid appointmentDate", // Select fields from Booking
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Appointment found",
      data: doctor.appointments, // Send populated appointments directly
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error during getting doctor booking details",
      error,
    });
  }
};
