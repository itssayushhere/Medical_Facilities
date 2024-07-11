import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Product:[{Photo: { type: String },
      Name: { type: String },
      Quantity: { type: Number, default: 1 },
      Price:{type:Number} }],
    Total: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
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
