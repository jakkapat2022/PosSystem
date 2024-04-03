import React,{ useEffect, useState } from 'react'
import '../../page/css/searchopa.css'
import { PiArrowFatDownFill } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchOparating = ({startDate,setStartDate,endDate,setEndDate}) => {

    let date = new Date()
    
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

        {/* {[result].map((val,id) => (
            <div>
                <h3>{id}</h3>
                <h4>{val.income}</h4>
            </div>
        ))} */}

        {/* <div>
            <h1>Total Bill Amount</h1>
            {Object.keys(result).map(index => (
                <div key={index}>
                    <p>{index}</p>
                    <p>Total: {result[index].income} THB</p>
                </div>
            ))}
        </div> */}
    </div>
  )
}

export default SearchOparating
