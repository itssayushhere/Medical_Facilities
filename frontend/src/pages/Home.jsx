import React from "react";
import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img01.webp";
import heroImg02 from "../assets/images/hero-img02.webp";
import heroImg03 from "../assets/images/hero-img03.webp";
import icon01 from "../assets/images/icon01.webp";
import icon03 from "../assets/images/icon03.webp";
import icon02 from "../assets/images/icon02.webp";
import videoIcon from "../assets/images/video-icon.webp";
import featureImg from "../assets/images/feature-img.webp";
import avatarIcon from "../assets/images/avatar-icon.webp";
import faqImg from "../assets/images/faq-img.webp";
import About from "../components/about/About";
import { BsArrowRight } from "react-icons/bs";
import ServicesList from "../components/services/ServicesList";
import DiagnosticList from "../components/diagnostic/DiagnosticList";
import FaqList from "../components/faqs section/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
const Home = () => {
  return (
    <>
      {/*========hero section========*/}
      <section className="hero_section pt-[20px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[40px] items-center justify-between">
            {/*=======hero content======*/}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patients get better and best.
                </h1>
                <p className="text_para">
                  {" "}
                  My website connects people with tuberculosis, offering support
                  and resources for health improvement and treatment.
                </p>
                <Link to={"/community"}>
                  <button className="btn font-semibold mt-3">
                    Join Community
                  </button>
                </Link>
              </div>
              {/*=====hero counter====*/}
              <div className="mt-[20px] lg:mt-[40px] flex flex-row lg:flex-row lg:items-center gap-5 lg:gap-[30px] leading-[40px] ">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[35px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[90px] h-1.5 bg-yellowColor rounded-full block mt-[-15px] s"></span>
                  <p className="text_para">Number of Hospitals</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[35px] lg:leading-[54px] font-[700] text-headingColor">
                    100+
                  </h2>
                  <span className="w-[90px] h-1.5 bg-irisBlueColor rounded-full block mt-[-15px] s"></span>
                  <p className="text_para">Medicine for you</p>
                </div>
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[35px] lg:leading-[54px] font-[700] text-headingColor">
                    20+
                  </h2>
                  <span className="w-[90px] h-1.5 bg-red-400 rounded-full block mt-[-15px] s"></span>
                  <p className="text_para">Community Members</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[40px] justify-end">
              <div className=" ">
                <img
                  loading="lazy"
                  src={heroImg02}
                  alt=""
                  className="w-full mb-[30px] rounded-2xl  object-cover "
                />
                <img
                  loading="lazy"
                  src={heroImg03}
                  alt=""
                  className="w-full  rounded-2xl "
                />
              </div>
              <div className="">
                <img
                  loading="lazy"
                  src={heroImg01}
                  alt=""
                  className=" rounded-3xl mt-[40px] "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========hero section end======== */}
      <section>
        <div className="container">
          <div className="lg:w-[870px] mx-auto">
            <h3 className="heading text-center">Do what best for you</h3>
            <p className="text_para text-center">
              This website is made for sole purpose for having the best and make
              you better
            </p>
          </div>
          <div className="grid gird-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] ">
            {/* ========Doctor======= */}
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img loading="lazy" src={icon01} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-5 text-textColor font-[400] mt-4 text-center">
                  Best Doctor in the whole country and differnet specialist
                  available.
                </p>
                <Link
                  to={"/doctors"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            {/* =======Services====== */}
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img loading="lazy" src={icon02} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Order Medicine .
                </h2>
                <p className="text-[16px] leading-5 text-textColor font-[400] mt-4 text-center">
                  Get best offer and affordable price for your medicine at your
                  doorstep.
                </p>
                <Link
                  to={"/services"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            {/* ===========Book health checkup====== */}
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img loading="lazy" src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[600] text-center">
                  Book Various checkup
                </h2>
                <p className="text-[16px] leading-5 text-textColor font-[400] mt-4 text-center">
                  Book Various checkup at your doorstep with affordable prices.
                </p>
                <Link
                  to={"/Checkup"}
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      {/* =======sevices section======= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center underline">
              Our medical services
            </h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health Systemm offers
              unmatched, Expert health care.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>
      {/* =======================services section end=============== */}
      {/* =====================feature section+============================ */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row mr-5 ">
            {/* =========================feature content================ */}
            <div className="xl:w-[770px]">
              <h2 className="heading">
                Get Virtual treatment <br /> anytime
              </h2>
              <ul className="pl-4">
                <li className="text_para">
                  1. Make an appointment online or by calling us.
                </li>
                <li className="text_para">
                  2.Search for your physician here, and contact their office.
                </li>
                <li className="text_para">
                  3.Get a virtual consultation with the doctor through our
                  platform.
                </li>
                <li className="text_para">
                  4.Community support is available to help you recover from
                  illness .
                </li>
              </ul>
              <Link>
                <button className="btn mt-3">Learn more</button>
              </Link>
            </div>
            {/* ===================feature img===================== */}
            <div className="relative z-10 xl:w-[770px] flex justify-center mt-[50px] lg:mt-0 mr-7">
              <img
                loading="lazy"
                src={featureImg}
                alt=""
                className="lg:w-3/5 w-3/4 rounded-full shadow-panelShadow"
              />
              <div className="w-[150px] lg:w-[180px] bg-white absolute bottom-[-20px] left-0 md:bottom-[100px] md:left-5pb z-20 p-2 lg:pt-4 lg-px-4 lg:pb-[16px] rounder-[10px] rounded-r-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600] ml-2">
                      {" "}
                      Tue , 24{" "}
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[400]">
                      10:00
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3  ">
                    <img loading="lazy" src={videoIcon} alt="" className="" />
                  </span>
                </div>
                <div className="w-[115px] lg:w-[96px] bg-[#CCf0F3] py-1 px-2 lg:px-[10px] text-[8px]leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img loading="lazy" src={avatarIcon} alt="" />
                  <h4 className="text-[13px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700]text-headingColor">
                    Adiyta Thakur
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======================feature section end=============================== */}
      {/* =============================diagonstic feature================== */}
      <section>
        <div className="container">
          <div className="xl-w-[470px] mx-auto">
            <h2 className="heading text-center ">
              Our Best <br /> Diagnostic Services
            </h2>
            <p className="text_para text-center">
              We offer a wide range of diagnostics to help you make informed
              decisions about your health.
            </p>
          </div>
          <DiagnosticList />
        </div>
      </section>
      {/* =================================diagonstic feature end====================== */}
      {/* =====================================faqs section=================== */}
      <section>
        <div className="contianer">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block ml-8 px-5">
              <img
                loading="lazy"
                src={faqImg}
                alt=""
                className="ml-10 size-18"
              />
            </div>
            <div className="w-full md:w-1/2 ">
              <h2 className="heading  lg:ml-0 ml-14">
                Most ask questions by patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ==============================faqs section end =========================== */}
      {/* ==============testimonial start=============== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto mb-9">
            <h2 className="heading text-center underline">
              What our users say about us.
            </h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health Systemm offers
              unmatched, Expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
      {/* ===============testimonial end ============== */}
    </>
  );
};

export default Home;
