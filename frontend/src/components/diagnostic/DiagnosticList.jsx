import React from "react";
import { feature } from "../../assets/data/feature";
import DiagnosticCard from "./DiagnosticCard";
const DiagnosticList = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {feature.map((feature) => (
          <DiagnosticCard key={feature.Name} feature={feature} />
        ))}

      </div>
    </>
  );
};

export default DiagnosticList;
