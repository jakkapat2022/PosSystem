import React, { useEffect, useState , useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import './bill.css'
import axios from 'axios'
import { useAuth } from './auth/UserAuth';
import { useNav } from '../layout/Nav';
import Fullbill from '../Fullbill';
import { SideBar,Container } from '../SideBar';
import { useLocation } from 'react-router-dom';
let API_URL = process.env.REACT_APP_API_URL

const Bill = () => {

  const { showSideBar , setPageCurrent } = useNav();
  const state = useLocation();
  setPageCurrent(state.state)
  const { user } = useAuth();
  const [billState, setBillState] = useState(false);
  const [billData, setBillData] = useState([]);
  const [billList, setBillList] = useState([]);
  const [showFullbill, setShowFullbill] = useState(false);
  const [limit , setLimit] = useState(100);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [sortBy, setSortby] = useState('desc');

  const getBill = async() => {
    try {
      let path = `bills/read`
      let query = `?uid=${user.ID}&limit=${limit}&orderBy=${orderBy}&sortBy=${sortBy}`
      const dataRaw = await axios.post(API_URL + path + query)
      setBillData([dataRaw])
    } catch (error) {
      console.log(error)
    }
  }

  const handle_show_page_bill = (bill=null) => {
    setBillState(!billState);
    setBillList(bill);
    setShowFullbill(!Fullbill);
  }

  const handle_fullBill = () =>{
    setShowFullbill(true);
  }

  useEffect(() => {

    getBill();

  },[]);

  //console.log(billData)
  console.log(showFullbill)

  return (
    <>
        <SideBar/>
        <Container sideBar={showSideBar} className='container con-ani'>
          <div className='box-bill'>
          {!billState ? 
          <>
            <div className='bill-table-box' >
            <table>
              <tr>
                  <th id='id'>ไอดี</th>
                  <th id='name'>บิลเลขที่</th>
                  <th id='seller'>ผู้ขาย</th>
                  <th id='payment'>การชำระเงิน</th>
                  <th id='total'>บิลรวม</th>
                  <th id='time'>เวลา</th>
              </tr>
              {billData[0]?.data?.data.map((d,idx) => (
                  <tr onClick={() => handle_show_page_bill(d)} key={idx} className='item-colum' style={{ 'height': '50px'}}>
                      <td>{d.id}</td>
                      <td>{d.bill_id}</td>
                      <td>{d.seller}</td>
                      <td>{d.status}</td>
                      <td>{d.total}</td>
                      <td>{d.createdAt}</td>
                  </tr>
              ))}
            </table>
            </div>
          </>
          :
          <>
            <ReadBillData billList={billList} handle={handle_show_page_bill} show={showFullbill} handle_fullBill={handle_fullBill}/>
          </>}
          </div>
        </Container>
    </>
  )
}

const ReadBillData = ({ billList , handle , show , handle_fullBill}) => {

  const componentRef = useRef();
  const [billProductData, setBillProductData] = useState([]);
  const [FullbillState, setFullbillState] = useState(true);

  const getBillProduct = async() => {
    try {
      const billApi = `${API_URL}bills/getall/product?bill_id=${billList?.bill_id}`
      const billProductData_row = await axios.post(billApi);

      setBillProductData([billProductData_row])
    } catch (error) {
      console.log(error)
    }
  }

  const billPrint = () => {
    window.print();
  }

  

  const handle_print = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    getBillProduct();
  },[]);

  console.log(billProductData)

  return (
    <>
    {show ? <>
    <div>
      <div className='bill-btn'>
            <button onClick={(e) => handle()}>กลับ</button>
            <button onClick={handle_print}>ปริ้น</button>
      </div>
      <div className='box-full'>
        {show && 
        <div>
          <Fullbill reff={componentRef} billProductData={billProductData} billList={billList}/>
        </div>
        }
      </div>
    </div>
    </> : <>
      <div className='billdata-box' >
        <div className='billdata-content' >
          <div className='header'>
              <h2>Jakkapat Shop</h2>
          </div>
          <div className='sub-header'>
              <h4 id='head'>บิลเลขที่ {billList?.bill_id}</h4>
              <h4>วันที่ {billList?.createdAt}</h4>
              <h4>พนักงาน {billList?.seller}</h4>
          </div>
          <div className='content'>
              <h4 id='head'>รายการที่ขาย</h4>
              {billProductData[0]?.data?.billProductData.map((value,idx) => (
                <div key={idx} className='sub-footer-content'>
                  <h4>{value.name} x {value.value}</h4>
                  <h4>{(value.value * value.price).toFixed(2)}</h4>
                </div>
              ))}
              <div className='sub-footer-content'>
                <h4>รวม</h4>
                <h4>{billList?.total}</h4>
              </div>
              <br/>
              <div className='sub-footer-content'>
                <h4>ภาษี 7%</h4>
                <h4>0</h4>
              </div>
              <div className='sub-footer-content'>
                <h4 id='head'>รวมทั้งหมด</h4>
                <h4 id='head'>{billList?.total}</h4>
              </div>
          </div>
          <div className='footer'>
              <div className='sub-footer'>
                <h4>การชำระเงิน</h4>
                <div className='sub-footer-content'>
                  <h4 id='head'>{billList?.status}</h4>
                  <h4 id='head'>{billList?.Income}</h4>
                </div>
                <div className='sub-footer-content'>
                  <h4>เงินทอน</h4>
                  <h4 id='head'>{billList?.totalchange}</h4>
                </div>  
              </div>
          </div>
          <div className='bill-btn'>
            <button onClick={(e) => handle()}>กลับ</button>
            <button onClick={() => handle_fullBill()}>ใบเสร็จเต็มรูปแบบ</button>
          </div>
        </div>
      </div>
    </> }

    </>
  )
}

export default Bill