/* eslint-disable react/prop-types */
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import FlightIcon from "@mui/icons-material/Flight";
import { formatDate } from "../../../utils/formatDate.js";
const OrderedCard = ({ items }) => {
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
            <button className="bg-sky-500 font-medium text-white px-2 py-0.5 mt-1 rounded-lg flex items-center">
              Track order <GpsFixedIcon />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <p className=" font-extralight">Order date :</p>
              <p>{formatDate(items.createdAt)}</p>
            </div>
            <div className="flex items-center text-green-600 font-semibold">
              <FlightIcon fontSize="small" />
              Estimated delivery:May 14,2020
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
        <div className="grid grid-cols-2 w-full p-2">
          <div className="">
            <p className="font-bold text-base">Payment Mode</p>
            <p className="">Cash ON Delivery</p>
          </div>
          <div className="">
            <p className="font-bold text-base">Delivery</p>
            <p className="font-extralight">Address</p>
            <p>
              Ayushman Bhojnalaya , Near Durga Mandir ,B.N.D Compound , Sakinaka
              , Kherani road ,Mumbai-400072
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedCard;
