import { useState, useEffect, useContext } from "react";
import usefetchData from "../hooks/usefetchData.jsx";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loader/Loading.jsx";
const Community = () => {
  const [reply, setReply] = useState(false);
  const [view, setView] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const { user, role, token } = useContext(authContext);
  let roles = "";
  const [question, setQuestion] = useState({
    question: "",
  });

  const [review, setReview] = useState({
    review: "",
  });
  if (role === "patient") {
    roles = "users";
  } else {
    roles = "doctors";
  }
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userData] = usefetchData(`${BASE_URL}/${roles}/profile/me`);
  const [loading, setloading] = useState(false);

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
      Reply: review.review,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/questions/reply/${currentQuestionId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newReply),
        }
      );
      if (response.ok) {
        toast.success("Reply submitted");

        setReview({ Reply: "" });
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
    const newQuestion = {
      question: question.question,
    };
    try {
      setloading(true);
      const response = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Question submitted");
        setQuestion({ question: "" });
        setQuestions([...questions, result]);
        setloading(false);
      } else {
        toast.error("Failed to submit the question.");
        setloading(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the question.");
      setloading(false);
    }
  };

  const fetchQuestions = async () => {
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/questions`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        setloading(false);
      } else {
        toast.error("Failed to fetch questions.");
        setloading(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching questions.");
      setloading(false);
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
      setloading(true);
      const response = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Question deleted successfully!");
        setQuestions(questions.filter((q) => q._id !== id));
        setloading(false);
      } else {
        toast.error("Failed to delete the question.");
        setloading(false);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
      setloading(false);
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
        {loading && <Loading />}
        {!loading && questions && questions.length > 0 ? (
          questions.map((q) => (
            <div
              key={q._id}
              className="border border-solid border-gray-300 rounded-md p-4 mb-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              {q.userId && (
                <div>
                  <div className="md:flex justify-between items-center">
                    <div>
                      <div className="flex gap-2 items-center">
                        <h2 className="font-extrabold text-lg text-gray-700">
                          {q.name}
                        </h2>
                        <h6 className="font-semibold italic">
                          @{q.userId.username}
                        </h6>
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
                        {q.userId.username === userData.username ? (
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
                            <h6 className="font-semibold italic">
                              @{r.userAdd.username}
                            </h6>
                          </div>
                          <p className="mt-2 ml-4">{r.Reply}</p>
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
