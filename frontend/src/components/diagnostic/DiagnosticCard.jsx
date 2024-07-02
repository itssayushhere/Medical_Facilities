import React from "react";
import starIcon from "../../assets/images/Star.webp";
const DiagnosticCard = ({ feature }) => {
  const { Name, Description, photo, person, totalrating } = feature;

  return (
    <>
      <div className="p-3 lg:p-5 ">
        <div className="ml-5">
          <img
            src={photo}
            alt=""
            className="rounded-2xl gap-3   "
          />
        </div>
        <div className=" flex mt-4 lg:mt-4  items-center justify-between">
          <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded ">
            {Name}
          </span>
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor lg:mr-10">
              <img src={starIcon} alt="" />
              {totalrating}
            </span>
          </div>
        </div>
        <div className=" justify-center items-center mt-2">
          <button className=" bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300  ">
            Book Now
          </button>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
            ({person})
          </span>
        </div>
      </div>
    </>
  );
};

export default DiagnosticCard;
