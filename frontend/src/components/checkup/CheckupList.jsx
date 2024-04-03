import React from 'react'

const CheckupList = () => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5  lg:gap-[30px] ">
      {Checkup.map((details) => (
        <CheckupCard key={details.id} details={details} />
      ))}
    </div>
    </>
  )
}

export default CheckupList