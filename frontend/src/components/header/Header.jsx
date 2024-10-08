import {   useContext } from "react";
import logo from "../../assets/images/logo.webp";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Avatars from "../../Dashboard/user_account/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tooltip } from "@mui/material";
import MenuSimple from "./Menu";
import DrawerMobileNavigation from "./Drawer.jsx";

const navLinks1 = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
];
const navLinks2 = [
  { path: "/community", display: "Community" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, token } = useContext(authContext);

  const handleCart = () => {
    navigate("/orders");
    window.location.reload();
  };

  return (
    <header className=" sticky top-0 header flex items-center bg-white z-50" >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Navigation */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <DrawerMobileNavigation
                navLinks1={navLinks1}
                navLinks2={navLinks2}
              />
            </div>
            <Link to="/home">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          {/* Main Navigation */}
          <nav className="navigation">
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks1.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
              <li>
                <MenuSimple />
              </li>
              {navLinks2.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {/* Right Side of Nav */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center gap-4">
                <Tooltip title="Cart">
                  <button type="button" onClick={handleCart}>
                    <ShoppingCartIcon color="primary" sx={{ fontSize: 27 }} />
                  </button>
                </Tooltip>
                <Tooltip title="Profile">
                  <Link
                    to={`${
                      role === "doctor"
                        ? "/doctors/profile/me"
                        : "/users/profile/me"
                    }`}
                  >
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer overflow-hidden">
                      {user.photo ? (
                        <img
                          src={user.photo}
                          className="w-full rounded-full"
                          alt="User"
                        />
                      ) : (
                        <Avatars Fullname={user.name} size={34} />
                      )}
                    </figure>
                  </Link>
                </Tooltip>
              </div>
            ) : (
              location.pathname !== "/login" && (
                <Link to="/login">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 font-bold"
                  >
                    Login
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
