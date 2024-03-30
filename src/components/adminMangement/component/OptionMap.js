import React, { useState } from 'react'

const OptionMap = ({ optionSelect , stateinput }) => {
    const [opdata , setopdate] = useState(["สมปอง","สมชาย","สมรัก","สมปอง","สมชาย","สมรัก","สมปอง","สมชาย","สมรัก","สมปอง","สมชาย","สมรัก","สมปอง","สมชาย","สมรัก","สมปอง","สมชาย","สมรัก"])


  return (
    <div className='Option'>
        <div className='option-box'>
        {opdata.map((data,idx) => (
            <div key={idx} onClick={() => optionSelect(data) & stateinput(false)} className='option-dropdown'>
                <strong>{data}</strong>
            </div>
        ))}
        </div> 
    </div>
  )
}

export default OptionMap
