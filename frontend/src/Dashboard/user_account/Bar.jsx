import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import MyBookings from "./MyBookings";
import Orders from "./Orders";
import Profile from "./Profile";
import useFetchData from "../../hooks/usefetchData";
import { BASE_URL } from "../../../config";
import { useDispatch, Provider } from "react-redux";
import store from "../../components/Compoentsforwebsite/Store";

const Handlestorereolad = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: "Reload" });
  }, [dispatch]);
  return null;
};

export default function Bar() {
  const [userData, loading, error] = useFetchData(
    `${BASE_URL}/users/profile/me`
  );
  const [tabKey, setTabKey] = React.useState(Date.now()); // Key to force re-render Orders

  const handleTabChange = (event, newValue) => {
    if (newValue === 2) {
      setTabKey(Date.now()); // Update the key to re-render Orders
    }
  };

  return (
    <Tabs defaultValue={2} onChange={handleTabChange}>
      <TabsList>
        <Tab value={1}>Bookings</Tab>
        <Tab value={2}>Orders</Tab>
        <Tab value={3}>Profile</Tab>
      </TabsList>
      <TabPanel value={1}>
        <MyBookings />
      </TabPanel>
      <TabPanel value={2}>
        <Orders key={tabKey} />
        <Provider store={store}>
          <Handlestorereolad />
        </Provider>
      </TabPanel>
      <TabPanel value={3}>
        <Profile user={userData} />
      </TabPanel>
    </Tabs>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  width: 100%;
  min-width: 360px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0,0,0, 0.2)"
  };
  `
);
