import React from 'react';

const MedicineCard = ({ medicine }) => {
  const { name, description, price, photo } = medicine;

  return (
    <div className="border p-4">
      <h3 className="text-lg font-semibold text-headingColor">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-700 mt-2">Price: ${price}</p>
      {photo && <img src={photo} alt={name} className="mt-2" />}
      {/* Assuming there's a photo URL in the 'photo' property */}
    </div>
  );
};

export default MedicineCard;
