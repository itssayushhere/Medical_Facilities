import React, { useState, useEffect } from "react";
import checkupImage1 from "../../assets/images/example.webp"; // Import your checkup images
import checkupImage2 from "../../assets/images/example.webp";
import checkupImage3 from "../../assets/images/example.webp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { BASE_URL, token } from "../../../config";
import { stringify } from "postcss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkup = () => {
  const checkups = [
    {
      id: 1,
      name: "Basic Health Checkup",
      image: checkupImage1,
      description:
        "Includes basic tests such as blood pressure, cholesterol, and blood sugar levels. This checkup package is suitable for individuals looking for a quick health assessment and includes essential diagnostic tests to monitor overall well-being.",
      price: 200,
      rating: 4.4,
    },
    {
      id: 2,
      name: "Comprehensive Health Checkup",
      image: checkupImage2,
      description:
        "Comprehensive examination covering various aspects of health including blood tests, ECG, and physical examination. This checkup is recommended for comprehensive health evaluation and includes detailed diagnostic tests to assess various health parameters.",
      price: 500,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Cardiac Checkup",
      image: checkupImage3,
      description:
        "Specialized checkup focusing on heart health with tests like ECG, stress test, and lipid profile. This package is ideal for individuals concerned about heart health and includes advanced diagnostic tests tailored to assess cardiac function and risks.",
      price: 1000,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Diabetes Screening",
      image: checkupImage3,
      description:
        "Screening tests specific to diabetes, including HbA1c, glucose tolerance test, and kidney function tests. This screening package is essential for individuals at risk of diabetes or managing the condition, providing necessary tests to monitor blood sugar levels and kidney health.",
      price: 300,
      rating: 4.1,
    },
    {
      id: 5,
      name: "Orthopedic Consultation",
      image: checkupImage3,
      description:
        "Consultation with an orthopedic specialist, including physical examination and X-ray evaluation. This consultation is beneficial for individuals experiencing musculoskeletal issues or injuries, providing expert assessment and diagnostic imaging to diagnose and treat orthopedic conditions.",
      price: 400,
      rating: 4.5,
    },
  ];
  const [picker, setPicker] = useState({
    date: null,
    time: null,
  });

  const [checkupdetails, setCheckupdetails] = useState({
    checkupname: " ",
    price: null,
    date: null,
    time: null,
  });
  const navigate = useNavigate();
  const createcheckup = async (name, price) => {
    const details = {
      checkupname: name,
      price: price,
      date: checkupdetails.date,
      time: checkupdetails.time,
    };
    try {
      const response = await fetch(`${BASE_URL}/users/addtocheckup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(details),
      });
      if (response.ok) {
        toast.success("Booked now ,Confirm it your profile ", {
          position: "bottom-center",
        });
        setPicker({ date: null, time: null });
        navigate("/users/profile/me");
      } else {
        toast.success("Already booked checkout in your profile");
        setPicker({ date: null, time: null });
      }
    } catch (error) {
      console.log(details);
      toast.error("Not abble to add checkup");
    }
  };

  const [currentId, setCurrentId] = useState(null);
  const [booking, setBooking] = useState(false);

  const handleTime = (newvalue) => {
    setPicker({ ...picker, time: newvalue });
  };

  const handleDate = (newvalue) => {
    setPicker({ ...picker, date: newvalue });
  };

  const handleBookNow = (checkupId) => {
    setCurrentId(checkupId);
    setBooking(true);
  };

  const [cleared, setCleared] = useState(false);
  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [cleared]);

  useEffect(() => {
    if (picker.date != null) {
      setCheckupdetails({
        ...checkupdetails,
        date: picker.date?.format("DD/MM/YYYY"),
      });
    }
  }, [picker.date]);
  useEffect(() => {
    if (picker.time != null) {
      setCheckupdetails({
        ...checkupdetails,
        time: picker.time?.format("HH:mm"),
      });
    }
  }, [picker.time]);

  const [currentdate, setcurrentDate] = useState("");
  useEffect(() => {
    let date = new Date();
    if (date.getDay() === 0) {
      date.setDate(date.getDate() + 1);
      setcurrentDate(date.toDateString());
    } else {
      date.setDate(date.getDate());
      setcurrentDate(date.toDateString());
    }
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-8">Checkup Options</h2>
      <div className="grid grid-cols-1 gap-6">
        {checkups.map((checkup) => (
          <div
            key={checkup.id}
            className="flex flex-col lg:flex-row transition-transform duration-500  rounded-xl  p-6"
          >
            <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
              <img
                src={checkup.image}
                alt={checkup.name}
                className="rounded-xl h-48 w-48 object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{checkup.name}</h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-2 text-gray-600">({checkup.rating})</span>
                </div>
                <p className="text-gray-700 mb-4">{checkup.description}</p>
                <p className="text-lg font-bold text-green-600 mb-4">
                  {checkup.price}
                </p>
              </div>
              <div className="flex justify-end ">
                {booking && currentId === checkup.id ? (
                  <div></div>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleBookNow(checkup.id)}
                  >
                    Book now
                  </button>
                )}
              </div>
              {booking && currentId === checkup.id && (
                <div className="flex flex-col mt-4">
                  <div className="flex items-center justify-center mb-4">
                    <span className=" text-lg mr-3">
                      Choose Date for Appointment :
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={picker.date}
                        onChange={(newvalue) => {
                          handleDate(newvalue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="DD/MM/YYYY"
                        minDate={dayjs(currentdate)}
                        shouldDisableDate={(date) => date.day() === 0}
                        slotProps={{
                          field: {
                            clearable: true,
                            onClear: () => setCleared(true),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className=" text-lg mr-3">
                      Choose Time for Appointment :
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={picker.time}
                        onChange={(newvalue) => {
                          handleTime(newvalue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        minTime={dayjs().hour(10).minute(0)}
                        maxTime={dayjs().hour(18).minute(0)}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="mt-10 flex justify-center items-center gap-4">
                    <button
                      className="bg-green-500 px-5 py-3 text-white font-bold  transition duration-300 rounded-xl "
                      onClick={() => createcheckup(checkup.name, checkup.price)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 text-white px-5 py-3 rounded-xl font-bold hover:bg-red-600 transition duration-300"
                      onClick={() => setBooking(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  {/* <div>{checkupdetails.time}</div>
                  <div>{checkupdetails.date}</div> */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkup;
