import Loading from "../../components/Loader/Loading";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/usefetchData";
import Error from "../../components/Error/Error";
import AppointmentCard from "./AppointmentCard";
const Doctorsapp = () => {
  const [data, loading, error] = useFetchData(`${BASE_URL}/book/user`);
  if (error) {
    return <Error errMessage={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mb-10">
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item._id}>
            <AppointmentCard data={item} />
          </div>
        ))
      ) : (
        <div className="flex w-full justify-center items-center">
          <h1>No Appointments</h1>
        </div>
      )}
    </div>
  );
};

export default Doctorsapp;
