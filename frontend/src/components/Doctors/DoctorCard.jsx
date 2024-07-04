import React from "react";
import starIcon from "../../assets/images/Star.webp";
import { Link } from "react-router-dom";
import doctor_male from '../../assets/images/doctor_male.avif'
import doctor_female from '../../assets/images/doctor_female.avif'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const DoctorCard = ({ doctor }) => {
  const {
    name,
    avgRating,
    photo,
    specialization,
    totalRating,
    hospital,
    totalPatients,
    gender,
    _id,
  } = doctor;
  return (
    <div className="p-3 lg:p-5  border rounded-3xl shadow-2xl shadow-sky-100  bg-sky-50 ">
      <div className="w-80 h-80 object-cover overflow-hidden rounded-lg mx-auto">
        {photo == null ? (
          gender == "male" ? (
            <img src={doctor_male} className="" alt="doctor Image" />
          ) : (
            <img src={doctor_female} className="" alt="doctor Image" />
          )
        ) : (
          <img src={photo} className="" alt="" />
        )}
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[20px] lg:leading-9 Otext-headingColor font-[700] mt-3 lg:mt-5 ">
        {name}
      </h2>
      <div className="mt-2 lg:mt-2 flex items-center justify-between ">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor ">
            <img src={starIcon} alt="" className=" " />
            {avgRating}
          </span>
          <span className="text-[14px] leading-6 lg:test-[16px] lg:leading-7 font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>
      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <h3 className="text-[16px] leading-7 lg:teset-[18px] lg:leading-[30px] font-semibold text-headingColor">
            +{totalPatients} patients
          </h3>
          <p className="text-[14px] leading-6 font-[400] text-textColor">
            At {hospital}
          </p>
        </div>
        <Link
          to={`/doctors/${_id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <ArrowForwardIcon className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
