// routes/Routers.js
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
import Signup from "../pages/Signup";
import Community from "../pages/Community";
import Medicine from "../pages/Medicine";
import Checkup from "../pages/medicalserviecs/Checkup";
import MyAccount from "../Dashboard/user_account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "../routes/Protectedroute.jsx";
import MentalHealth from "../pages/MentalHealth";
import Success from "../pages/Success";
import { AuthContextProvider } from "../context/AuthContext";
import OrderTabs from "../pages/Orders/OrderTabs.jsx";
import { useEffect } from "react";

const Routers = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };  
  return (
    <AuthContextProvider>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/orders" element={<OrderTabs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors/:id" element={<DoctorsDetails />} />
        <Route path="/community" element={<Community />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/checkup" element={<Checkup />} />
        <Route path="/mentalhealth" element={<MentalHealth />} />
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/profile/me/checkout_success"
          element={<Success />}
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default Routers;
