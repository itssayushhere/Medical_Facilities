import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    meeting: {
      type: String,
      enum: ["video", "hospital"],
      required: true,
    },
    time: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "attended","missed", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    photo: { type: String },
  },
  {timestamps:true}
);

export default mongoose.model("Booking", bookingSchema);
