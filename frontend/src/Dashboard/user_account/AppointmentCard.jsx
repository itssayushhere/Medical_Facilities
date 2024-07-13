/* eslint-disable react/prop-types */
import defaultphoto from "../../assets/images/user.webp";
import videoIcon from "../../assets/images/video-icon.webp";
import { formatDate } from "../../utils/formatDate";

const AppointmentCard = ({ data }) => {
  return (
    <div className=" border rounded-2xl bg-white  shadow-xl ">
      <div className="">
        <div className="flex justify-between bg-sky-200 items-center gap-2 m-3 p-2 border-b-2 border-gray-600 rounded-xl ">
          <div className="flex items-center justify-start gap-1 ">
            {data.doctor.photo ? (
              <img
                src={data.doctor.photo}
                alt="Doctor photo"
                className="booking_img rounded-full"
                width={40}
                height={20}
              />
            ) : (
              <img
                src={defaultphoto}
                alt="Doctor photo"
                className="booking_img rounded-full"
                width={40}
                height={20}
              />
            )}
            <div>
              <p>{data.doctor.name}</p>
            </div>
          </div>
          <div className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded mr-2">
            <p>{data.doctor.specialization}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>Appointment Date:</p>
          <div className="flex justify-center items-center gap-2">
            <p>{formatDate(data.appointmentDate)}</p>
            <p className="font-bold">10:10</p>
          </div>
        </div>
        <div className="flex gap-2 m-2 p-2 items-center justify-center">
          <div>
            {data.meeting == "video" ? (
              <div className="flex justify-center items-center">
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
            ) : (
              <>
                <p>Hospital Address :</p>
                <p>{data.doctor.hospital}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2 items-center p-2">
          <p>Appointment Status:</p>
          {data.status == "pending" && (
            <p className="bg-red-600 p-1 rounded text-red-950 font-bold">
              Pending
            </p>
          )}
          {data.status == "missed" && (
            <p className="bg-red-600 p-1 rounded text-red-950 font-bold">
              Missed
            </p>
          )}
          {data.status == "attended" && (
            <p className="bg-green-600 p-1 rounded text-green-950 font-bold">
              Attended
            </p>
          )}
          {data.status == "cancelled" && (
            <p className="bg-red-600 p-1 rounded text-red-950 font-bold">
              Cancelled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
