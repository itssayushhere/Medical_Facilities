import aboutImg from "../../assets/images/about.webp";
import aboutCardImg from "../../assets/images/about-card.webp";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
            {/* =====about img===== */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
              <img loading="lazy" src={aboutImg} alt="" />
              <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-10%] md:right-[-7%] lg:right-[22%]">
                <img loading="lazy" src={aboutCardImg} alt="" />
              </div>
            </div>
            {/* =========about content======== */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
              <h2 className="heading">Proud to be one of nations best</h2>
              <p className="text_para">
                For 30 years in a row, India News and World report has
                reconginzed us as one of the best publics hospitals in the
                nation and #1 in Mumbai.
              </p>
              <p className="text_para">
                Our hospital distinguishes itself through a commitment to
                excellence in healthcare, placing the well-being of patients at
                the forefront. One notable strength is our team of highly
                skilled and compassionate healthcare professionals who work
                tirelessly to provide personalized and comprehensive care.{" "}
              </p>
              <Link to="/home">
                <button className="btn mt-3">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
