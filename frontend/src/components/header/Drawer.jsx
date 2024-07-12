/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Menu from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

export default function DrawerMobileNavigation({ navLinks1, navLinks2 }) {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState(false);
  const navLinks = [
    {
      path: "/medicine",
      display: "Order Medicine",
    },
    {
      path: "/Checkup",
      display: "Book Checkup",
    },
    {
      path: "/mentalhealth",
      display: "Mental Health",
    },
  ];

  return (
    <>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}  >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
            width:220,
          }}
        >
          
        </Box>

        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize:"2xl",
            "& > div": { justifyContent: "center" },
            paddingTop: "150px",

          }}

        >
          {navLinks1.map((link, index) => (
            <ListItemButton key={index}>
              <NavLink
                to={link.path}
                className={(navClass) =>
                  navClass.isActive
                    ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                    : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                }
                onClick={() => {
                  setServices(false);
                  setOpen(false);
                }}
              >
                {link.display}
              </NavLink>
            </ListItemButton>
          ))}

          <ListItemButton>
            <div className="w-full">
              <button
              type="button"
                className="w-full text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                onClick={() => setServices((prev) => !prev)}
              >
                Services
              </button>
              {services && (
                <div className=" ml-12">
                  {navLinks.map((link, index) => (
                    <ListItemButton key={index}>-
                      <NavLink
                        to={link.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                            : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                        }
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        {link.display}
                      </NavLink>
                    </ListItemButton>
                  ))}
                </div>
              )}
            </div>
          </ListItemButton>

          {navLinks2.map((link, index) => (
            <ListItemButton key={index}>
              <NavLink
                to={link.path}
                className={(navClass) =>
                  navClass.isActive
                    ? "text-darkblueColor text-[16px] leading-7 font-[600]"
                    : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor "
                }
                onClick={() => {
                  setServices(false);
                  setOpen(false);
                }}
              >
                {link.display}
              </NavLink>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}
