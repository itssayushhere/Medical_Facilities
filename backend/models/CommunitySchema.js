import mongoose from "mongoose";

// Define the reply schema
const replySchema = new mongoose.Schema(
  {
    userAdd: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'refType'  // Dynamic reference
    },
    refType: {
      type: String,
      required: true,
      enum: ['User', 'Doctor'],
    },
    Reply: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Define the community schema with embedded replies
const communitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'refType'  // Dynamic reference
    },
    refType: {
      type: String,
      required: true,
      enum: ['User', 'Doctor'],
    },
    question: {
      type: String,
      required: true,
    },
    reviews: [replySchema], // Embedding the reply schema
  },
  { timestamps: true }
);

export default mongoose.model("Question", communitySchema);
