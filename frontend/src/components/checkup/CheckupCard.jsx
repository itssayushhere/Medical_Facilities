import React from 'react'
import photo from '../../assets/images/eye.png'
const CheckupCard = () => {
  // const {id,Name,photo,price} = details
  return (
    <>
    <div className='flex gap-4 m-4 '>
      <div className=''>
      <img src={photo} alt="" height={200} width={300} className=' rounded-2xl'/>
      </div>
      <div>
        <h1>Ayushman</h1>
      </div>
    </div>
    </>
  )
}

export default CheckupCard