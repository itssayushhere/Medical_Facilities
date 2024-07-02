import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext); // Remove || and change || to =
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Corrected the syntax
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      {/* <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span> */}
      <div className=" lg:flex flex-col space-y-4 pb-4 px-4 rounded-md shadow-md items-center">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
          } w-full btn py-2 rounded-md transition-colors duration-300`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600"
          } w-full btn py-2 rounded-md transition-colors duration-300`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-500 hover:bg-purple-200 hover:text-purple-600"
          } w-full btn py-2 rounded-md transition-colors duration-300`}
        >
          Profile
        </button>
        <div className="mt-[100px] w-full">
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
    </div>
  );
};

export default Tabs;
