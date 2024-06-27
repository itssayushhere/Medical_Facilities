import React from "react";
import useFetchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../../config";
import Loading from "../../components/Loader/Loading";
import { useNavigate } from "react-router-dom";
const Checkup = () => {
  const [userData, loading, error] = useFetchData(
    `${BASE_URL}/users/profile/me`
  );
  const navigate = new useNavigate();

  const handlenavigation = () => {
    navigate("/Checkup");
  };
  return (
    <div>
      {!loading &&
      userData &&
      userData.Checkup &&
      userData.Checkup.length > 0 ? (
        userData.Checkup.map((items) => (
          <div key={items._id} className="p-1 bg-slate-600 rounded-2xl">
            <div className="p-4 bg-white rounded-2xl">
              <div className="flex items-center">
                <span className="font-semibold ">{items.checkupname}</span>
              </div>
              <span className="mt-2 font-sans">
                Appointment for {items.date}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>
          {loading && !error ? (
            <Loading />
          ) : (
            !loading &&
            !userData && (
              <div>
                <h1>You don't have any Checkup booking</h1>
                <button onClick={handlenavigation}>Book Now</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Checkup;
