import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvator from "../../assets/images/patient-avatar.webp";
import StarIcon from "@mui/icons-material/Star";

const Testimonial = () => {
  return (
    <div className="mt-30px lg:mt-55px px-5 py-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          649: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-40px px-6 rounded-3">
            <div className="flex items-center gap-13px mt-10px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-30px px-6 rounded-3">
            <div className="flex items-center gap-13px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-30px px-6 rounded-3">
            <div className="flex items-center gap-13px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-30px px-6 rounded-3">
            <div className="flex items-center gap-13px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-30px px-6 rounded-3">
            <div className="flex items-center gap-13px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-30px px-6 rounded-3">
            <div className="flex items-center gap-13px">
              <img src={patientAvator} alt="" />
              <div>
                <h4 className="text-18px leading-30px font-semibold text-headingColor ml-2 ">
                  {" "}
                  Akash rhaeja
                </h4>
                <div className="flex items-center gap-25px ml-2">
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                  <StarIcon className="text-yellowColor w-18px h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-400">
              I have taken medical service from them. They treat so well and
              they are providing the best medical services.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
