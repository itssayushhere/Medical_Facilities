import React, { useState } from "react";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/usefetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error"; // Ensure you have this component for error handling
import { formatDate } from "../../utils/formatDate";

const Appointments = () => {
  const [data, loading, error] = useFetchData(`${BASE_URL}/book/doctor`);

  return (
    <section className="container bg-gray-100 ">
      <div className=" mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table-auto w-full text-center">
              <thead className="bg-sky-200">
                <tr>
                  <th className="px-4 py-3 font-bold">Patient Name</th>
                  <th className="px-4 py-3 font-bold">Date</th>
                  <th className="px-4 py-3 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-4">{item.user.name}</td>
                    <td className="px-4 py-4">{formatDate(item.appointmentDate)}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-600 hover:font-bold transition duration-300"
                      >
                        Attend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointments;
