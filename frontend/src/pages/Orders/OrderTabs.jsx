import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Tabs } from "antd";
import { useMediaQuery } from "@mui/system";
import Orders from "./Orders.jsx";
import Ordered from "./Ordered.jsx";
const items = [
  {
    key: "1",
    label: "Cart",
    children: <Orders />,
  },
  {
    key: "2",
    label: "Orderd",
    children:<Ordered/>,
  },
];
const OrderTabs = () => {
  const theme = useTheme();
  const [direction, setDirection] = useState("left");
  
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
