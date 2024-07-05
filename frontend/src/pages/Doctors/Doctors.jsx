import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../../config";
import useFectchData from "../../hooks/usefetchData";
import { useEffect, useState } from "react";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Doctors = () => {
  const theme = useTheme();
  const [data, loading, error] = useFectchData(`${BASE_URL}/doctors`);

  // Search state
  const [searchby, setSearchby] = useState("name");
  const [searchinput, setSearchinput] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  const [searched, setSearched] = useState(false);

  const handlesearch = () => {

    setCurrentpage(1)
    setSearched(true);
    const filtered = data.filter((item) => {
      if (searchby === "name") {
        return item.name.toLowerCase().includes(searchinput.toLowerCase());
      } else {
        return (
          item.specialization &&
          item.specialization.toLowerCase().includes(searchinput.toLowerCase())
        );
      }
    });
    setFilterdata(filtered);
  };

  const handleOptionChange = (event) => {
    setSearchby(event.target.value);
  };
  const handleclose = () => {
    setSearchinput("");
    setSearched(false);
  };
  const handleinputchange = (e) => {
    setSearchinput(e.target.value);
  };

  // Pagination state and logic
  const [currentpage, setCurrentpage] = useState(1);
  const [Itemsperpage] = useState(6);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dataToPaginate = searched ? filterdata : data;
  const totalpage = Math.ceil(dataToPaginate.length / Itemsperpage);
  const end = currentpage * Itemsperpage;
  const start = end - Itemsperpage;
  const currentdata = dataToPaginate.slice(start, end);

  const pagenumber = [];
  for (let i = 1; i <= totalpage; i++) {
    pagenumber.push(i);
  }
  const pagination = (pagenumber) => {
    setCurrentpage(pagenumber);
    if (isSmallScreen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (isMediumScreen) {
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 430, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Search Section */}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find A Doctor</h2>
          <div className="max-w-[670px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="input"
              value={searchinput}
              placeholder="Search Doctor"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              onChange={handleinputchange}
            />
            {searched && (
              <button
                className=" p-2 font-normal text-2xl text-slate-600"
                onClick={handleclose}
              >
                x
              </button>
            )}
            <button
              className="py-4 pl-4 pr-3 bg-blue-500 mt-0 rounded-[0px] rounded-r-md text-center text-white font-semibold"
              onClick={handlesearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container text-center mt-3">
          <label  className="font-semibold">
            Search by :{" "}
          </label>
          <div className="flex gap-2 items-center justify-center font-serif">
            <input
              type="radio"
              name="search"
              value="name"

              checked={searchby === "name"}
              onChange={handleOptionChange}
            />
            <span className="">Name</span>
            <input
              type="radio"

              name="search"
              value="specialization"
              checked={searchby === "specialization"}
              onChange={handleOptionChange}
            />
            <span className="">Speciality</span>
          </div>
        </div>
      </section>
      {/* Doctors Section */}
      <section>
        {loading && !error && <Loading />}
        {error && <Error errMessage={error} />}
        {!loading && !error && (
          <section>
            {currentdata.length < 1 ? (
              <div className="text-center mb-10 font-semibold text-2xl text-gray-700">
                <h1>No Doctor Found</h1>
              </div>
            ) : (
              <div className="container mb-40">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                  {currentdata.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                  ))}
                </div>
                <ul>
                  <div
                    className={
                      isMediumScreen
                        ? "flex justify-center mt-10 items-center gap-8 border-b-2 border-t-2 p-5  border-gray-700"
                        : "flex justify-center mt-10 items-center gap-8 border-b-2 border-t-2 p-5 m-72 border-gray-700"
                    }
                  >
                    {pagenumber.map((items, index) => (
                      <button
                        type="button"
                        onClick={() => pagination(items)}
                        key={index}
                      >
                        <li
                          className={
                            items === currentpage
                              ? "border px-5 py-3 rounded-full border-black bg-blue-500 text-white  text-xl"
                              : "border px-5 py-3 rounded-full text-xl border-black hover:bg-gray-400"
                          }
                        >
                          {items}
                        </li>
                      </button>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            <div className="container">
              <div className="xl:w-[470px] mx-auto">
                <h2 className="heading text-center">What Our Patients Say</h2>
                <p className="text_para text-center">
                  World-Class Care For Everyone. Our Health System Offers
                  Unmatched, Expert Health Care.
                </p>
              </div>
              <Testimonial />
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Doctors;
