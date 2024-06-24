import React, { useContext, useRef } from "react";
import { authContext } from "./../../context/AuthContext.jsx";
import userImg from "../../assets/images/doctor-img01.png";
import { useState } from "react";
import MyBookings from "./MyBookings.jsx";
import Profile from "./Profile.jsx";
import Orders from "./Orders.jsx";
import useFetchData from "../../hooks/usefetchData.jsx";
import { BASE_URL } from "../../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import defaultPhoto from "../../assets/images/user.png";
import Bar from "./Bar.jsx";
import Avatars from "./Avatar.jsx";

const MyAccount = () => {
  const { dispatch } = useContext(authContext); //for logout
  const [tab, setTab] = useState("orders"); //tab for profile and my booking
  const [userData, loading, error] = useFetchData(
    `${BASE_URL}/users/profile/me`
  );

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); //logout
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px]  rounded-full border-2 border-solid ☐ border-primaryColor overflow-hidden">
                  {userData.photo === "" ? (
                    <div>
                      <Avatars Fullname={userData.name} size={104} />
                    </div>
                  ) : (
                    <img
                      src={userData.photo}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  )}
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] ☐ text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  @{userData.username}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px] ">
                <button
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button className="w-full □ bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px] ">
              <Bar />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
