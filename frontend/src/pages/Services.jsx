import React from 'react'
import ServicesCard from '../components/services/ServicesCard'
import { services } from '../assets/data/services'
const Services = () => {
  return (
    <section>
      <div className="container">
      <div className="grid grid-cols-1 md:gird-cols-1 lg:grid-cols-3 gap-5  lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {services.map((item, index) => (
          <ServicesCard item={item} index={index} key={index} />
        ))}
        
      </div>
      </div>
    </section>
  )
}

export default Services