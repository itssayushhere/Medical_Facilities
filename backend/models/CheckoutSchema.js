import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Medicine: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    Total: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    Status: {
      type: String,
      enum: ["packing", "shipping", "onWay", "delivered"],
      default: "packing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Checkout", CheckoutSchema);
