import React from 'react'
import Loading from '../../components/Loader/Loading';
import { BASE_URL } from '../../../config';
import useFetchData from '../../hooks/usefetchData';
import Error from '../../components/Error/Error';
import AppointmentCard from './AppointmentCard';
const Doctorsapp = () => {
  const [data, loading, error] = useFetchData(`${BASE_URL}/book/user`);
  console.log(data)
  if(loading){
    return <Loading/>
  }
  if(error){
    return <Error errMessage={error}/>
  }
  return (
    <div className='container'>
      <AppointmentCard/>
    </div>
  );
}

export default Doctorsapp