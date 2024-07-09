import  { useContext } from "react";
import { authContext } from "./../../context/AuthContext.jsx";
import useFetchData from "../../hooks/usefetchData.jsx";
import { BASE_URL } from "../../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import Bar from "./Bar.jsx";
import Avatars from "./Avatar.jsx";

const MyAccount = () => {
  const { dispatch } = useContext(authContext); // for logout
  const [userData, loading, error] = useFetchData(
    `${BASE_URL}/users/profile/me`
  );

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // logout
    window.location.reload();
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1170px] mx-auto">
        {loading && !error && <Loading />}
        {error && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="pb-10 px-6 rounded-md bg-white shadow w-full md:w-auto">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor overflow-hidden">
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
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
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
              <div className="mt-10">
                <button
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 px-4 py-6 bg-white shadow rounded-md w-full md:w-auto">
              <Bar userData={userData} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
