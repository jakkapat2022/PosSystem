import React from 'react'
import '../fullbill.css'

const Test = () => {
  return (
    <div className='container-a4'>
        <div className='a4'>
            <div className='header'>
                <h1>Jakkapat Shop</h1>
                <h1>ใบเสร็จรับเงิน/ใบกำกับภาษี</h1>
            </div>
            <div className='sub-header'>
                <h3>วันที่...........</h3>
                <div className='sub-con-header'>
                    <h3>เล่มที่............</h3>
                    <h3>เลขที่...........</h3>
                </div>
            </div>
            <div className='content-header'>
                <h3>ชื่อผู้ขาย......................................</h3>
                <h3>ที่อยู่.........................................</h3>
                <div className='sub-con-header'>
                    <h3>เลขประจำตัวผู้เสียภาษี.........................</h3>
                    <h3>โทรศัพท์...................................</h3>
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
                    <tr id='product'>
                        <td id='number'>1</td>
                        <td id='list'>มาม่า</td>
                        <td id='value'>5</td>
                        <td id='unit'>30</td>
                        <td id='total'>150</td>
                    </tr>
                    <tr id='product'>
                        <td id='number'>1</td>
                        <td id='list'>มาม่า</td>
                        <td id='value'>5</td>
                        <td id='unit'>30</td>
                        <td id='total'>150</td>
                    </tr>
                    <tr id='vated'>
                        <td colSpan={4} id='Vat'>มูลค่าก่อนเสียภาษี</td>
                        <td id='total'>934.00</td>
                    </tr>
                    <tr id='vated2'>
                        <td colSpan={4} id='Vat'>ภาษีมูลค่าเพิ่ม ( vat 7% )</td>
                        <td id='total'>65</td>
                    </tr>
                    <tr id='totallast'>
                        <td colSpan={4} id='Vat'>ยอดรวม</td>
                        <td id='total'>1000</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Test
