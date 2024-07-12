import { useState } from "react";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/Star.webp";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import useFectchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const DoctorsDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("about");

  const [data, loading, error] = useFectchData(`${BASE_URL}/doctors`);
  const doctor = data.find((doctor) => doctor._id === id);
  return (
    <section>
      {loading && !error && !doctor && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && doctor && (
        <div className="max-w-[1170px] px-5 mx-auto">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  {doctor.photo ? (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full"
                    />
                  ) : (
                    <p>No photo</p>
                  )}
                </figure>
                <div>
                  <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {doctor.specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="star" /> {doctor.avgRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({doctor.totalRating})
                    </span>
                  </div>
                  <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {doctor.hospital}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={doctor.name}
                    about={doctor.about}
                    qualifications={doctor.qualifications}
                    experiences={doctor.experiences}
                  />
                )}
                {tab === "feedback" && <Feedback />}
              </div>
            </div>

            <div>
              <SidePanel
              Name={doctor.name}
              photo={doctor.photo}
              hospital={doctor.hospital}
              speicalization={doctor.specialization}
                timeslots={doctor.timeSlots}
                ticketPrice={doctor.ticketPrice}
                Description={doctor.bio}
                id ={id}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorsDetails;
