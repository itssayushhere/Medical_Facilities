import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const createBooking = async (req, res) => {
  const userId = req.userId;
  const doctorId = req.params.id;
  const { ticketPrice, appointmentDate, isPaid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const newBooking = new Booking({
      user: user._id,
      doctor: doctor._id,
      ticketPrice,
      appointmentDate,
      isPaid,
    });
    
    await newBooking.save();

    // Optionally, add the booking to the user's and doctor's appointments arrays
    user.appointments.push(newBooking._id);
    doctor.appointments.push(newBooking._id);

    await user.save();
    await doctor.save();

    // Populate user and doctor fields in the new booking
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('user', 'name email') // Specify fields to include if necessary
      .populate('doctor', 'name specialization');

    res.status(200).json({ success: true, message: "Booking done", booking: populatedBooking });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error during booking", error });
  }
};
export const getUserBookingDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate({
      path: 'appointments',
      populate: {
        path: 'doctor', // Assuming 'doctor' is populated in Booking
        select: 'name specialization', // Select fields to populate from doctor
      },
      select: 'doctor ticketPrice status isPaid appointmentDate', // Select fields from Booking
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
        path: 'appointments',
        populate: {
          path: 'user', // Assuming 'doctor' is populated in Booking
          select: 'name specialization', // Select fields to populate from doctor
        },
        select: 'user ticketPrice status isPaid appointmentDate', // Select fields from Booking
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
  