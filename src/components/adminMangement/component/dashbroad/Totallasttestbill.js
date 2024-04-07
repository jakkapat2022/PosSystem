import React,{ useEffect, useState }from 'react'
import { getdataDashBroad } from './getdataDashBroad'
import '../../page/css/lasttestbill.css'

let api_url = process.env.REACT_APP_API_URL


const Totallasttestbill = () => {

    const [lasttestbill, setLasttestbill] = useState([])
    const getApi = async () => {
        const _class = new getdataDashBroad(api_url)
        const result = await _class.getlasttestbill()
        setLasttestbill(result.data)
    }

    useEffect(() => {
        getApi();
    },[])

    console.log(lasttestbill)
  return (
    <div className='box'>
        <table>
            <tr>
                <th id='bill'>บิลล่าสุด</th>
                <th id='total'>จำนวนเงิน</th>
            </tr>
            {lasttestbill[0]?.rows.map((val,idx) => (
                <tr key={idx}>
                    <td id='bill'>{val.bill_id}</td>
                    <td id='total'>{val.total}</td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default Totallasttestbill
