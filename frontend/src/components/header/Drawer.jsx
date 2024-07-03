import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function DrawerMobileNavigation({ navLinks1, navLinks2 }) {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState(false);

  // useEffect(() => {
  //   if (!open) {
  //     setServices(false);
  //   }
  // }, [open]);

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
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
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
                className="w-full text-textColor text-[16px] leading-7 font-[500]"
                onClick={() => setServices((prev) => !prev)}
              >
                Services
              </button>
              {services && (
                <div className=" ml-20">
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
