/* eslint-disable react/prop-types */
import FlightIcon from "@mui/icons-material/Flight";
import { formatDate } from "../../../utils/formatDate.js";
import TrackOrder from "./TrackOrder.jsx";
import { useMediaQuery } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const OrderedCard = ({ items }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="p-7 lg:w-[860px] md:w-[400px] bg-white rounded-lg shadow-2xl mt-7 ">
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full border-b-2 pb-4">
          <div className="flex justify-between items-end w-full mb-3">
            <div>
              <p className=" font-light">Order ID: </p>
              <p className="font-medium text-2xl">
                #{items._id.substring(16, 24)}
              </p>
            </div>
            <TrackOrder status={items.Status}/>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <p className=" font-extralight">Order date :</p>
              <p>{formatDate(items.createdAt)}</p>
            </div>
            <div className="flex items-center text-green-600 font-semibold">
              <FlightIcon fontSize="small" />
              Estimated delivery:May 14
            </div>
          </div>
        </div>
        <div className="w-full  mt-5 border-b-2 ">
          {items.Product &&
            items.Product.map((items, index) => (
              <div
                key={index}
                className="flex justify-between p-2 items-center "
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={items.Photo}
                    alt="Medicine Photo"
                    width={60}
                    className=" bg-gray-200 p-2 rounded"
                  />
                  <div>
                    <p className="font-medium">{items.Name}</p>
                    <p className="font-extralight">Price:{items.Price}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className=" font-medium text-lg ">
                    ₹{items.Price * items.Quantity}
                  </p>
                  <p className=" font-extralight">Qty:{items.Quantity}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={isSmallScreen?"flex flex-col w-full p-2":"grid  grid-cols-2 w-full p-2"}>
          <div className="">
            <p className="font-bold text-base">Payment Mode</p>
            <div className="flex items-center justify-center mt-3">
              <button
                className=" bg-green-500 p-2 text-green-950 rounded-lg font-bold "
                disabled
              >
                Cash on Delivery
              </button>
            </div>
          </div>
          <div className="">
            <p className="font-bold text-base ">Delivery</p>
            <p className="font-extralight">Address</p>
            <p>
              please add Address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedCard;
