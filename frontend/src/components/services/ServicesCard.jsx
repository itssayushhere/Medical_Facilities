/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ServicesCard = ({ item, index }) => {
  const { name, desc, bgColor, textcolor,link } = item;
  return (
    <div className="py-[30px] px-3 lg:px-5">
      <h2 className="text-[26px] leading-9  text-headingCOlor font-[700]">
        {name}
      </h2>
      <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
        {desc}
      </p>
      <div className="flex items-center justify-between mt-[30px]">
      <Link to={link}
        className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
        <ArrowForwardIcon className="group-hover:text-white w-6 h-5" />
      </Link>
      <span className="w-[40px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[500]" style={{
        background : `${bgColor}`,
        color: `${textcolor}`,
        borderRadius : "6px 0 0 6px"
      }}> 
        {index +1}
      </span >
      </div>
    </div>
  );
};

export default ServicesCard;
