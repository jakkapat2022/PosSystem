import React, { useEffect, useState } from 'react'
import Income from '../../../../assets/icons/income.png'
import Profit from '../../../../assets/icons/profits.png'
import Cost from '../../../../assets/icons/cost.png'
import Bill from '../../../../assets/icons/bill.png'
import { getdataDashBroad } from './getdataDashBroad'
let api_url = process.env.REACT_APP_API_URL

const TotalOparating = ({ start , end }) => {

    const [totalOpa, setTotalOpa] = useState([]);

    const getTotal = async () => {
        const _class = new getdataDashBroad(api_url,start,end);
        const result = await _class.getTotalOpa();
        console.log(result)
        setTotalOpa(result.data)
    }

    useEffect(() => {

        getTotal();

    },[start,end])

    //console.log(totalOpa)
  return (
    <>
    <div className='totalOpa'>
      <div id='revenue' className='item'>
        <div id='totalOpaHeader'>
            <img src={Income} alt={Income}/>
            <strong>รายรับ</strong>
        </div>
        <h3 id='result'>{totalOpa?.income?.total} บาท</h3>
      </div>
      <div id='revenue' className='item'>
        <div id='totalOpaHeader'>
            <img src={Cost} alt={Cost}/>
            <strong>ต้นทุน</strong>
        </div>
        <h3 id='result'>{totalOpa?.cost?.total} บาท</h3>
      </div>
      <div id='revenue' className='item'>
        <div id='totalOpaHeader'>
            <img src={Profit} alt={Profit}/>
            <strong>กำไร</strong>
        </div>
        <h3 id='result'>{totalOpa?.profit} บาท</h3>
      </div>
      <div id='revenue' className='item'>
        <div id='totalOpaHeader'>
            <img src={Bill} alt={Bill}/>
            <strong>จำนวนบิลที่ขายได้</strong>
        </div>
        <h3 id='total-bill'>{totalOpa?.income?.bills}</h3>
      </div>
    </div>
    </>
  )
}

export default TotalOparating
