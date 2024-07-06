import React from "react";
import defaultphoto from "../../assets/images/user.webp";
import videoIcon from "../../assets/images/video-icon.webp";

const AppointmentCard = () => {
  return (
    <div className=" border    rounded-2xl bg-white  shadow-xl ">
      <div className="">
        <div className="flex justify-between bg-sky-200 items-center gap-2 m-3 p-2 border-b-2 border-gray-600 rounded-xl ">
          <div className="flex items-center justify-start gap-1 ">
            <img
              src={defaultphoto}
              alt="default"
              className="booking_img rounded-full"
              width={40}
              height={20}
            />
            <div>
              <p>Ayushman Yadav</p>
            </div>
          </div>
          <div className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded mr-2">
            <p>specialization</p>
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p>Appointment Date:</p>
          <p>12 Jan 2020</p>
          <p className="font-bold">(10:10)</p>
        </div>
        <div className="flex gap-2 m-2 p-2 items-center justify-center">
          <div className="bg-blue-700 p-1 rounded">
            <img
              loading="lazy"
              src={videoIcon}
              alt="Video Icon"
              width="16"
              height="16"
            />
          </div>
          <p>Video Meeting on</p>
          <a href="https://meet.google.com/fkx-eevg-fyz">Google Meet</a>
        </div>

        <div className="flex justify-center gap-2 items-center p-2">
          <p>Appointment Status:</p>
          <p className="bg-red-600 p-1 rounded text-red-950 font-bold">Pending</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
