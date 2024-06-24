import mongoose, { Schema } from "mongoose";

// Define the reply schema
const replySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Define the community schema with embedded replies
const CommunitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
    },
    reviews: [replySchema], // Embedding the reply schema
  },
  { timestamps: true }
);

export default mongoose.model("Question", CommunitySchema);
