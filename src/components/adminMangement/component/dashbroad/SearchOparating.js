import React,{ useEffect, useState } from 'react'
import '../../page/css/searchopa.css'
import { TbCalendarSearch } from "react-icons/tb";
import { PiArrowFatDownFill } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getdataDashBroad } from './getdataDashBroad';
let api_url = process.env.REACT_APP_API_URL

const SearchOparating = ({startDate,setStartDate,endDate,setEndDate}) => {

    //console.log("startDate" , startDate)
    //console.log("endDate" , endDate)
    let date = new Date()

    const getApi = async () => {
        const _class = new getdataDashBroad(api_url,startDate,endDate)
        const result = await _class.getTotalOpaSelected();
        console.log(result)
    }

    useEffect(() => {
        if(!startDate || !endDate) return

        getApi();
    },[startDate,endDate])
  return (
    <div className='search-opa'>
        <div className='searchopa-input'>
            <DatePicker 
                closeOnScroll={true} 
                isClearable 
                toggleCalendarOnIconClick 
                id='input-date' 
                showIcon 
                selectsStart
                selected={startDate} 
                onChange={(date) => setStartDate(date)}/>
        </div>
        <PiArrowFatDownFill id='toicon'/>
        <div className='searchopa-input'>
            <DatePicker 
                closeOnScroll={true} 
                isClearable 
                selectsEnd
                toggleCalendarOnIconClick 
                id='input-date' showIcon  
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                
                minDate={startDate || date}/>
        </div>
    </div>
  )
}

export default SearchOparating
