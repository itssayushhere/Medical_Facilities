import React from 'react'
import Loading from '../../components/Loader/Loading';
import { BASE_URL } from '../../../config';
import useFetchData from '../../hooks/usefetchData';
const Doctorsapp = () => {
  const [
    appointments,
    loading,
    error,
  ] = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-8 text-center ☐ leading-7 text-[20px] font-semibold text-primaryColor ">You did not have any doctor appointments yet! </h2>
      )}
    </div>
  );
}

export default Doctorsapp