import Question from "../models/CommunitySchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
// Create a new question
export const createQuestion = async (req, res) => {
  const userId = req.userId;
  const { question } = req.body;

  try {
    // Check if the userId corresponds to a User or a Doctor
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    let submiter;
    let refType;

    if (user) {
      submiter = user;
      refType = "User";
    } else if (doctor) {
      submiter = doctor;
      refType = "Doctor";
    } else {
      return res.status(400).json({ error: "User or Doctor not found" });
    }

    // Create a new question
    const newQuestion = new Question({
      userId: submiter._id,
      refType: refType,
      question: question,
    });

    await newQuestion.save();

    // Add the question to the user's or doctor's Community array
    if (refType === "User") {
      user.Community.push(newQuestion._id);
      await user.save();
    } else {
      doctor.Community.push(newQuestion._id);
      await doctor.save();
    }

    // Manually populate the user field based on refType
    const populatedQuestion = await newQuestion.populate({
      path: "userId",
      select: "name username email",
    });

    res.status(200).json({
      success: true,
      message: "Question Submitted",
      Question: populatedQuestion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to create a reply

export const createReply = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { Reply } = req.body;
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(400).json({ error: "Question not found" });
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    let refType;
    let userAdd;
    if (user) {
      refType = "User";
      userAdd = user._id;
    } else if (doctor) {
      refType = "Doctor";
      userAdd = doctor._id;
    } else {
      res
        .status(404)
        .json({ success: false, message: "User not found on the database" });
    }
    const newReply = {
      userAdd,
      refType,
      Reply,
    };
    question.reviews.push(newReply);
    await question.save();
    res.status(200).json({ success: true, message: "Reply Submitted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    // Fetch questions without populating
    const questions = await Question.find();

    // Iterate through questions to populate userAdd in reviews
    const populatedQuestions = await Promise.all(
      questions.map(async (question) => {
        // Populate userId
        const user = await (question.refType === 'User'
          ? User.findById(question.userId).select('name username email')
          : Doctor.findById(question.userId).select('name username email'));

        // Populate each review's userAdd
        const populatedReviews = await Promise.all(
          question.reviews.map(async (review) => {
            const userAdd = await (review.refType === 'User'
              ? User.findById(review.userAdd).select('name username email')
              : Doctor.findById(review.userAdd).select('name username email'));

            return {
              ...review.toObject(),
              userAdd,
            };
          })
        );

        return {
          ...question.toObject(),
          userId: user,
          reviews: populatedReviews,
        };
      })
    );

    res.status(200).json(populatedQuestions);
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
      return res.status(404).json({ message: "Question not found" });
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
      return res.status(404).json({ message: "Question not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
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
