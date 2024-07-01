import { useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import Avatars from "../../Dashboard/user_account/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tooltip } from "@mui/material";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/community",
    display: "Community",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const handlecart = () => {
    navigate("/orders");
    window.location.reload();
  };
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between ">
          {/*====logo===== */}
          <div className="flex items-center justify-center gap-2">
            <Tooltip title="Menu">
              <span className="md:hidden" onClick={toggleMenu}>
                <BiMenu className="w-7 h-11 cursor-pointer " />
              </span>
            </Tooltip>
            <Link to={"/"}>
              <div>
                <img src={logo} alt="Logo" />
              </div>
            </Link>
          </div>
          {/*===menu====*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem] ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/*==nav right==*/}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center justify-center gap-4">
                <Tooltip title="Cart">
                  <button onClick={handlecart}>
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
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer overflow-hidden ">
                      {user?.photo ? (
                        <img
                          src={user.photo}
                          className="w-full rounded-full"
                          alt="User's Photo"
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
                <Link to={"/login"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 font-bold">
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
