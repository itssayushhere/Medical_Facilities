import { doctors } from "./../../assets/data/doctors";
import DoctorCard from "./DoctorCard";
const DoctorList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5  lg:gap-[30px] ">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
