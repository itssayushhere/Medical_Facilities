import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  cart: [
    {
      productphoto: { type: String },
      productName: { type: String }, // Name of the product
      quantity: { type: Number, default: 1 }, // Quantity of the product
      price: { type: Number, default: 0 },
    },
  ],
  Checkup: [
    {
      checkupname: { type: String, required: true },
      price: { type: Number, default: null },
      date: { type: String },
      time: { type: String },
    },
  ],
});

export default mongoose.model("User", UserSchema);
