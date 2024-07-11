import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import useFetchData from "../../hooks/usefetchData.jsx";
import OrderedCard from "./Component/OrderedCard.jsx";

const Ordered = () => {
  const [data, loading, error] = useFetchData(`${BASE_URL}/buyout/ordered`);
  const navigate = useNavigate();
  console.log(data);
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="">
        {loading && !error && <Loading />}
        {Error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div>
            {data && data.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center mt-10 text-lg">
                <h1>You have no orders Book now:</h1>
                <button
                  className="p-2 bg-blue-500 text-blue-950 rounded-xl font-semibold"
                  onClick={() => navigate("/medicine")}
                >
                  Order Medicine
                </button>
              </div>
            ) : (
              <OrderedCard/>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ordered;
