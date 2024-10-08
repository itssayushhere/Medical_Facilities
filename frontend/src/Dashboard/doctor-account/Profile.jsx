/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { BASE_URL, token } from "../../../config";
import uploadImageToCloudinary from "../../utils/uploadCLoudinary";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
const Profile = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospitals: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
    hospital: "",
  });

  useEffect(() => {
    if (user) {
      const {
        about,
        name,
        email,
        photo,
        gender,
        bio,
        specialization,
        ticketPrice,
        phone,
        qualifications,
        experiences,
        timeSlots,
        hospital,
      } = user;
      setFormData({
        name: name || "",
        email: email || "",
        photo: photo || null,
        gender: gender || "male",
        bio: bio || "",
        specialization: specialization || "",
        about: about || "",
        ticketPrice: ticketPrice || "",
        phone: phone || "",
        qualifications: qualifications || [
          { startingDate: "", endingDate: "", degree: "", university: "" },
        ],
        experiences: experiences || [
          { startingDate: "", endingDate: "", position: "", hospitals: "" },
        ],
        timeSlots: timeSlots || [{ day: "", startingTime: "", endingTime: "" }],
        hospital: hospital || "",
      });
    }
  }, [user]);
  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    updatedFormData[section][index][name] = value;
    setFormData({ ...updatedFormData });
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  // const updateProfileHandler = async (e) => {
  //   e.preventDefault();
  // };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleDeleteItem = (e, key, index) => {
    e.preventDefault(); // Prevent the default button behavior
    if (formData[key].length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: prevFormData[key].filter((_, i) => i !== index),
      }));
    }
  };

  // const handleReusableInputChangeFunc = (event, index, key) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => {
  //     const updatedItems = [...prevFormData[key]];
  //     updatedItems[index][name] = value;
  //     return {
  //       ...prevFormData,
  //       [key]: updatedItems,
  //     };
  //   });
  // };
  const submithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Updated the Profile");
      const data = await res.json();
      window.location.reload();
    } catch (error) {
      toast.error("Error updating, please try again");
    } finally {
      setLoading(false);
    }
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospitals: "",
    });
  };

  const addTimeslot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };
  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form_label font-semibold">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label font-semibold">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form_label font-semibold">Phone Number*</p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label font-semibold">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Bio"
            className="form__input"
            maxLength={800}
          />
        </div>
        <div className="mb-5">
          <p className="form_label font-semibold">Current Hospital*</p>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={(e) =>
              setFormData({ ...formData, hospital: e.target.value })
            }
            placeholder="Your Workplace"
            className="form__input"
            maxLength={50}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label font-semibold">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="form_input py-3.5 w-52"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <p className="form_label font-semibold">specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                className="form_input py-3.5 w-52"
              >
                <option value="">Select</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="Sexologist">Sexologist</option>
              </select>
            </div>
            <div>
              <p className="form_label font-semibold">Charges*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={(e) =>
                  setFormData({ ...formData, ticketPrice: e.target.value })
                }
                className="form_input p-2"
              />
            </div>
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-5">
          <p className="form_label font-semibold">Qualifications*</p>
          {formData.qualifications.map((item, index) => (
            <div key={`qualification-${index}`}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "qualifications", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "qualifications", index)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "qualifications", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form_label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "qualifications", index)
                      }
                    />
                  </div>
                </div>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={(e) => handleDeleteItem(e, "qualifications", index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>

        {/* Experiences */}
        <div className="mb-5">
          <p className="form_label font-semibold">Experiences*</p>
          {formData.experiences.map((item, index) => (
            <div key={`experience-${index}`}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "experiences", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "experiences", index)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "experiences", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form_label">Hospitals*</p>
                    <input
                      type="text"
                      name="hospitals"
                      value={item.hospitals}
                      className="form__input w-full"
                      onChange={(e) =>
                        handleInputChange(e, "experiences", index)
                      }
                    />
                  </div>
                </div>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={(e) => handleDeleteItem(e, "experiences", index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addExperience}
          >
            Add Experiences
          </button>
        </div>

        {/* Timeslots */}
        <div className="mb-5">
          <p className="form_label font-semibold">Time Slots*</p>
          {formData.timeSlots.map((item, index) => (
            <div key={`timeslot-${index}`}>
              <div>
                <div className="grid grid-cols-2 md-gird-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      onChange={(e) => handleInputChange(e, "timeSlots", index)}
                      className="form__input py-3.5"
                    >
                      <option value="">Select</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input w-full"
                      onChange={(e) => handleInputChange(e, "timeSlots", index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input w-full"
                      onChange={(e) => handleInputChange(e, "timeSlots", index)}
                    />
                  </div>
                </div>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={(e) => handleDeleteItem(e, "timeSlots", index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addTimeslot}
          >
            Add Timeslots
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About</p>
          <textarea
            name="about"
            cols="10"
            rows="5"
            value={formData.about}
            placeholder="Write About yourself"
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            className="form__input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex-items">
              <img
                src={formData.photo}
                className="w-full rounded-full"
                alt="User"
              />
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

        <div className="mt-7">
          <button
            type="submit"
            onClick={submithandler}
            className="bg-primaryColor text-white text-18px leading-[30px] w-full py-3 px-4"
          >
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
