"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetail from '../_component/DoctorDetail';
import DoctorSuggestionList from '../_component/Suggestions';

const Details = ({params}) => {
  const [doctor,setDoctor]=useState();
  useEffect(()=>{
    getDoctorById();
  },[])
  const getDoctorById=()=>{
    GlobalApi.getDoctorById(params.recordId).then(resp=>{
      setDoctor(resp.data.data);
    })
  }
  return (
    <div className='p-5 px-20'>
     <h2 className='font-bold text-[22px] '> Details</h2>
     <div className='grid grid-cols-1 lg:grid-cols-4'>
     {/* doctor info */}
      <div className='col-span-3'>
      {doctor&& <DoctorDetail doctor={doctor}/>}
      </div>
      {/* suggetions */}
      <div className='col-span-1'>
        <DoctorSuggestionList/>
      </div>
     </div>
    </div>
  )
}

export default Details
