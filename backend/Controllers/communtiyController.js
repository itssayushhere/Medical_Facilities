import Question from '../models/CommunitySchema.js';
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { name,username, question } = req.body;
    const newQuestion = new Question({name,username, question });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, question } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { username, question },
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};

// export const fetch_details = async (req, res) => {
//   const userId = req.userId;
//   const userRole = req.userRole;
//   try {
//     let profile;
//     if (userRole === 'user') {
//       profile = await User.findById(userId);
//     } else if (userRole === 'doctor') {
//       profile = await Doctor.findById(userId);
//     }

//     if (!profile) {
//       return res.status(404).json({ success: false, message: "Profile Not Found" });
//     }

//     const { password, ...rest } = profile._doc;

//     res.status(200).json({
//       success: true,
//       message: "Profile info is getting",
//       data: { ...rest },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Something went wrong, cannot get profile" });
//   }
// };

import { validationResult } from 'express-validator';

// Controller function to create a reply
export const createReply = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { username, review } = req.body;

  try {
    // Find the question by ID
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Create a new review
    const newReview = {
      username,
      review,
    };

    // Add the review to the question's reviews array
    question.reviews.push(newReview);

    // Save the updated question document
    await question.save();

    res.status(201).json({ message: 'Review added successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// export const getreview = async (req, res) => {
//   try {
//     const {id} = req.params
//     const questions = await Question.find(id);
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
