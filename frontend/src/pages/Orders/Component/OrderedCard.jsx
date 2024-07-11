import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import defaultphoto from "../../../assets/images/user.webp";
import FlightIcon from '@mui/icons-material/Flight';
const OrderedCard = () => {
  const data = [
    { Name: "Ayushman", price: 1000, quantity: 2 },
    { Name: "Ayushman", price: 1000, quantity: 2 },
    { Name: "Ayushman", price: 1000, quantity: 2 },
  ];
  return (
    <div className="p-7 lg:w-[860px] md:w-[400px] bg-white rounded-lg shadow-2xl mt-7 ">
      <div className="flex flex-col justify-center items-center ">
        <div className=" border-b-2 pb-4">
          <div className="flex justify-between items-end w-full mb-3   gap-20">
            <div>
            <p className=" font-light">Order ID: </p>
            <p className="font-medium text-2xl">#{12321412}</p>
            </div>
            <button className="bg-sky-500 font-medium text-white px-2 py-0.5 mt-1 rounded-lg flex items-center">
              Track order <GpsFixedIcon />
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
            <p className=" font-extralight">Order date :</p>
            <p>Feb 16, 2020</p>
            </div>
            <div className="flex items-center text-green-600 font-semibold">
            <FlightIcon fontSize="small"/>Estimated delivery:May 14,2020
            </div>
          </div>
        </div>
        <div className="w-full  mt-5 ">
          {data.map((items, index) => (
            <div
              key={index}
              className="flex justify-between mb-2 p-2 bg-slate-400 "
            >
              <div className="flex gap-2">
                <img src={defaultphoto} alt="" width={30} />
                <p>{items.Name}</p>
              </div>
              <p>{items.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderedCard;
