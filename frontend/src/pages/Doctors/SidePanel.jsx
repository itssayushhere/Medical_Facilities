
const SidePanel = ({ timeslots, ticketPrice }) => {
  return (
    <div className="shadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Appointment Charges</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} Rupeee 
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeslots.map((item, index) => (
            <li className="flex items-center justify-between mb-2" key={index}>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.startingTime} : {item.endingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md">
        Request Appointment
      </button>
    </div>
  );
};

export default SidePanel;
