import React,{ useState } from 'react'

const OptionMapUnit = ({ optionSelect , stateinput }) => {
    const [opdata , setopdate] = useState(["ห่อ","แก้ว","ถ้วย","อัน","ลัง","ขวด","ป๋อง"])


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

export default OptionMapUnit
