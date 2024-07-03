import React, { useState, useEffect, useContext } from "react";
import usefetchData from "../hooks/usefetchData.jsx";
import { BASE_URL, role } from "../../config.js";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [reply, setReply] = useState(false);
  const [view, setView] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const { user, role, token } = useContext(authContext);
  let roles = "";
  const [question, setQuestion] = useState({
    username: "",
    question: "",
    name: "",
  });

  const [review, setReview] = useState({
    username: "",
    review: "",
  });
  if (role === "patient") {
    roles = "users";
  } else {
    roles = "doctors";
  }
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userData, loading, error] = usefetchData(
    `${BASE_URL}/${roles}/profile/me`
  );

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleReplyChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleView = (id) => {
    setView(true);
    setCurrentQuestionId(id);
  };
  const handleReply = (id) => {
    if (!user || !token) {
      navigate("/login");
      toast.error("Please Login ");
    } else {
      setReply(true);
      setCurrentQuestionId(id);
    }
  };
  const handleSubmitReply = async (currentQuestionId) => {
    const newReply = {
      username: userData.username,
      review: review.review,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/questions/${currentQuestionId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReply),
        }
      );
      if (response.ok) {
        const result = await response.json();
        toast.success("Reply submitted");

        setReview({ username: "", review: "" });
        setReply(false);
        setCurrentQuestionId(null);
        // Refresh the questions to show the new reply
        fetchQuestions();
      } else {
        toast.error("Failed to submit reply.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting reply.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      navigate("/login");
    }

    if (loading || error || !userData) {
      toast.error("Please Login ");
      return;
    }

    const newQuestion = {
      username: userData.username,
      name: userData.name,
      question: question.question,
    };
    try {
      const response = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Question submitted");
        setQuestion({ username: "", question: "", name: "" });
        setQuestions([...questions, result]);
      } else {
        toast.error("Failed to submit the question.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the question.");
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        toast.error("Failed to fetch questions.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching questions.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Question deleted successfully!");
        setQuestions(questions.filter((q) => q._id !== id));
      } else {
        toast.error("Failed to delete the question.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center font-bold p-12">
        <h1 className="text-4xl text-blue-600">
          Become Better and Greater Together
        </h1>
      </div>
      <div className="question_input mb-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Enter your doubts and worries here without any worries"
              name="question"
              value={question.question}
              onChange={handleQuestionChange}
              className="flex-grow border border-solid border-gray-300 focus:outline-none focus:border-blue-500 text-base leading-7 placeholder-gray-500 rounded-l-md p-4 mr-2 shadow-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 rounded-r-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="questions_list mt-8">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div
              key={q._id}
              className="border border-solid border-gray-300 rounded-md p-4 mb-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="md:flex justify-between items-center">
                <div>
                  <div className="flex gap-2 items-center">
                    <h2 className="font-extrabold text-lg text-gray-700">
                      {q.name}
                    </h2>
                    <h6 className="font-semibold italic">@{q.username}</h6>
                  </div>
                  <p className="mt-2">{q.question}</p>
                </div>
                <div className="flex justify-between items-center">
                  {q.reviews.length > 0 ? (
                    view && currentQuestionId === q._id ? (
                      <div className="p-2">
                        <button
                          type="button"
                          className="underline italic"
                          onClick={() => setView(false)}
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <div className="p-2">
                        <button
                          type="button"
                          className="underline italic"
                          onClick={() => handleView(q._id)}
                        >
                          View Replies
                        </button>
                      </div>
                    )
                  ) : (
                    <div></div>
                  )}
                  <div className="">
                    {q.username === userData.username ? (
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleDelete(q._id)}
                      >
                        Delete
                      </button>
                    ) : reply && currentQuestionId === q._id ? (
                      <div></div>
                    ) : (
                      <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => handleReply(q._id)}
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {view &&
                currentQuestionId === q._id &&
                q.reviews.map((r) => (
                  <div
                    key={r._id}
                    className=" p-3 mb-3  transition duration-300 ease-in-out ml-8"
                  >
                    <div>
                      <div className="flex gap-2 items-center">
                        <h6 className="font-semibold italic">@{r.username}</h6>
                      </div>
                      <p className="mt-2 ml-4">{r.review}</p>
                    </div>
                  </div>
                ))}
              {reply && currentQuestionId === q._id && (
                <div className="mt-4 ml-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitReply(currentQuestionId);
                    }}
                  >
                    <textarea
                      placeholder="Write your reply..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                      onChange={handleReplyChange}
                      value={review.review}
                      name="review"
                    ></textarea>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Submit Reply
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => setReply(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="font-bold justify-center items-center">
            No questions yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Community;
