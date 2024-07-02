import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Radio, Tabs } from "antd";
import { useMediaQuery } from "@mui/system";
import Orders from "./Orders.jsx";
import Checkup from '../Community.jsx'
const items = [
  {
    key: "1",
    label: "Cart",
    children: <Orders />,
  },
  {
    key: "2",
    label: "Orderd",
    children: <Checkup/>,
  },
];
const OrderTabs = () => {
  const theme = useTheme();
  const [mode, setMode] = useState("top");
  const [direction, setDirection] = useState("left");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    if (isSmallScreen) {
      setDirection("top");
    } else {
      setDirection("left");
    }
  }, [isSmallScreen]);
  return (
    <div className="">
      <Tabs
        defaultActiveKey="1"
        tabPosition={direction}
        centered
        type="card"
        size="large"
        style={{
          height: "100%",
        }}
        items={items}
      />
    </div>
  );
};
export default OrderTabs;
