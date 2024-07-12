import { medicines } from "./../../assets/data/medicines.js"; // Assuming you have a file with medicine data
import MedicineCard from "./MedicineCard.jsx"; // Assuming you have a MedicineCard component

const MedicineList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 lg:gap-[30px]">
      {medicines.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
};

export default MedicineList;
