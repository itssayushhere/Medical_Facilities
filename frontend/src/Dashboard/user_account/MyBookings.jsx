import React, { useState } from "react";
import useFetchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../../config";
import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import Doctorsapp from "./Doctorsapp.jsx";
import Checkup from "./Checkup.jsx";
import BasicTabs from "./Tabbar.jsx";

const MyBookings = () => {
  return (
    <div className="">
      <BasicTabs />
    </div>
  );
};

export default MyBookings;
