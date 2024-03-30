import React from 'react'
import './fullbill.css'
import { useAuth } from './page/auth/UserAuth';

const Fullbill = ({ billProductData , billList , reff}) => {

    const { user } = useAuth();
    let date = new Date();

    console.log(date)
  return (
    <div ref={reff} className='container-a4'>
        <div  className='a4'>
            <div >
            <div className='header'>
                <h1>Jakkapat Shop</h1>
                <h1>ใบเสร็จรับเงิน/ใบกำกับภาษี</h1>
            </div>
            <div className='sub-header'>
                <h3>วันที่ {date.getDay()} / {date.getMonth()} / {date.getFullYear()}</h3>
                <div className='sub-con-header'>
                    <h3>เล่มที่ {billList.id}</h3>
                    <h3>เลขที่ {billList.bill_id}</h3>
                </div>
            </div>
            <div className='content-header'>
                <h3>ชื่อผู้ขาย {user.ID}</h3>
                <h3>ที่อยู่ 559/320 บ้านพิศาล1 ถนนประชาพัฒนา เขตลาดกระบัง กรุงเทพมาหานคร</h3>
                <div className='sub-con-header'>
                    <h3>เลขประจำตัวผู้เสียภาษี 1379900206229</h3>
                    <h3>โทรศัพท์ 0810727067</h3>
                </div>
            </div>
            <div className='content-header'>
                <h3>ชื่อผู้ซื้อ......................................</h3>
                <h3>ที่อยู่.........................................</h3>
                <div className='sub-con-header'>
                    <h3>เลขประจำตัวผู้เสียภาษี.........................</h3>
                    <h3>โทรศัพท์...................................</h3>
                </div>
            </div>
            <div className='table-content'>
                <table>
                    <tr>
                        <th id='number'>ลำดับ</th>
                        <th id='list'>รายการ</th>
                        <th id='value'>จำนวน</th>
                        <th id='unit'>หน่วยละ</th>
                        <th id='total'>จำนวนเงิน</th>
                    </tr>
                    {billProductData[0]?.data?.billProductData.map((value,idx) => (
                            <tr key={idx} id='product'>
                                <td id='number'>{idx + 1}</td>
                                <td id='list'>{value.name}</td>
                                <td id='value'>{value.value}</td>
                                <td id='unit'>{value.price}</td>
                                <td id='total'>{(value.value * value.price).toFixed(2)}</td>
                            </tr>
                    ))}
                    <tr id='vated'>
                        <td colSpan={4} id='Vat'>มูลค่าก่อนเสียภาษี</td>
                        <td id='total'>{(billList.total - (billList.total * 7 / 107)).toFixed(2)}</td>
                    </tr>
                    <tr id='vated2'>
                        <td colSpan={4} id='Vat'>ภาษีมูลค่าเพิ่ม ( vat 7% )</td>
                        <td id='total'>{(billList.total * 7 / 107).toFixed(2)}</td>
                    </tr>
                    <tr id='totallast'>
                        <td colSpan={4} id='Vat'>ยอดรวม</td>
                        <td id='total'>{billList.total}</td>
                    </tr>
                </table>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Fullbill
