import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // Ensure bcryptjs is installed and imported
import uploadImageToCloudinary from "../../utils/uploadCLoudinary.js";
import { BASE_URL, token } from "../../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";
// import { authContext } from "../context/AuthContext.jsx"; // Assuming you have a context for auth

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",
    bloodType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { name, email, photo, gender, bloodType } = user;
      setFormData({
        name: name || "",
        email: email || "",
        photo: photo || "",
        gender: gender || "male",
        bloodType: bloodType || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, password: hashedPassword }),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      window.location.reload()
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  // const deleteHandler = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${BASE_URL}/users/${user._id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const { message } = await res.json();
  //     if (!res.ok) {
  //       throw new Error(message);
  //     }
  //     setLoading(false);
  //     toast.success(message);
  //     navigate("/users/profile/me");
  //   } catch (err) {
  //     toast.error(err.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="mt-10">
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
        </div>
        <div className="mb-5 mt-5">
          <input
            type="email"
            placeholder="✉️Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
            aria-readonly
            readOnly
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
        </div>
        <div className="mb-5 mt-5">
          <input
            type="text"
            placeholder="🩸Blood type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-16px leading-7 placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
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
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex-items overflow-hidden">
              <img src={formData.photo} className="w-full rounded-full" />
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
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-18px leading-30px rounded-lg px-4 py-4"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
