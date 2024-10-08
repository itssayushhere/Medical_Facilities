import {  useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCLoudinary.js";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";
const Signup = () => {
  const [selectedfile, setSelectedfile] = useState(null);
  const [perviewURL, setPerviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    photo: selectedfile,
    gender: "male",
    role: "patient",
  });
  const [formError, setFormError] = useState({
    name: "",
    password: "",
  });
  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (!formData.name) {
      errors.name = "Full name is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(formData.name)) {
      errors.name = "Full name must include first and last name";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormError(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPerviewURL(data.url);
    setSelectedfile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const { message } = await res.json();
        if (!res.ok) {
          throw new Error(message);
        }
        setLoading(false);
        toast.success(message);
        navigate("/login");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ======================img box ================= */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg ">
            <figure className="rounded-l-lg">
              <img
                loading="lazy"
                src={signupImg}
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          {/* ===================sign up form ==================================== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              ➕ Create an <span className="text-primaryColor">account </span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5 mt-5">
                <input
                  type="text"
                  placeholder="👤Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
                {formError.name && <p className="ml-2 text-red-800 text-sm">*{formError.name}</p>}
              </div>
              <div className="mb-5 mt-5">
                <input
                  type="text"
                  placeholder="*️⃣Create an Username "
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5 mt-5">
                <input
                  type="email"
                  placeholder="✉️Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
                
              </div>
              <div className="mb-5 mt-5">
                <input
                  type="password"
                  placeholder="🔐Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
                {formError.password && <p className="ml-2 text-red-800 text-sm">*{formError.password}</p>}
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7 ">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label className="text-headingColor font-bold text-[16px] leading-7 ">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                {selectedfile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex-items">
                    <img src={perviewURL} className="w-full rounded-full" />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload photo
                  </label>
                </div>
              </div>

              <div>
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-18px leading-30px rounded-lg px-4 py-4 "
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
              <p className="mt-4 text-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className="text-primaryColor font-medium ml-1"
                >
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
