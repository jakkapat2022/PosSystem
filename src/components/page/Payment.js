import React, { useEffect, useState } from 'react'
import { useLocation , Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Backdrop from '../Backdrop';
import { useCookies } from 'react-cookie'
import { useAuth } from './auth/UserAuth';
import AlertBox from '../AlertBox';

const Payment_blog = styled.div`
    visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
`;

const Pre_payment = styled.div`
    visibility: ${({ state }) => (state ? 'hidden' : 'visible')};
`;

const Payment_succes = styled.div`
    visibility: ${({ state }) => (state ? 'visible' : 'hidden')};
`;

const Payment = () => {

    const { datauser } = useAuth();
    const [state , setState] = useState(false);
    const [paySucces , setPaySucces] = useState(false);

    let location = useLocation();
    let navigate = useNavigate();

    const money = [10,20,30,40,50,100,200,500,1000,2000];
    const [price, setPrice] = useState(0);
    const [totaltext, setTotaltext] = useState("");
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [cookies, setCookie] = useCookies(['bill']);
    const [wayPayment, setWayPayment] = useState('');
    let api_url = process.env.REACT_APP_API_URL;
    const [alertMessage, setAlertMessage] = useState('');

    //data array 
    let data_arr = []
    let id_pdt = []
    let value = []


    const addTexttotal = (d) => {
        setTotaltext(totaltext + d)  
    }

    const paymentNext = () => {
        if(totaltext == "") return setAlertMessage("กรุณารับเงิน");

        if(parseInt(totaltext) < price) return setAlertMessage("กรุณารับเงินเพิ่ม");
        setPaySucces(true)
    }

    const success_bill = async () => {
        let date = new Date();
        let newbill = Date.now() + date.getDate();

        try {
            //const axiosInstance = new axios.Axios({})
            const data = await axios.post(`${api_url}bills/succes`, {
                bill_id : location.state[0][0].bill_id,
                waypay : wayPayment,
                uid: datauser?.data?.id,
                Income: (parseInt(totaltext)).toFixed(2),
                change: (total).toFixed(2)
            })
            //console.log(data)
            setCookie('bill', newbill, { path: '/' })

        } catch (error) {
            console.log(error)
        }
        navigate('/')
    }

    const get_bill = async () => {
        try {
            const data = await axios.post(`${api_url}bills/getproduct?bill_id=${location.state[0][0].bill_id}`)
            setData([data]);
            setPrice(data?.data?.total);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        get_bill();
    },[])
    useEffect(() => {
       
        if(parseInt(totaltext) >= price){
            setTotal(parseInt(totaltext) - price)
        }

    },[totaltext])

    //console.log(location.state[0][0].bill_id)
    //console.log(data_arr[0])
  return (
    <>
    {alertMessage.length > 1 && <AlertBox message={alertMessage} handle={() => setAlertMessage('')}/>} 
    <Pre_payment state={state} className='pre-payment-container'>
        <button onClick={() => (setPaySucces(true),
                                setTotal(0),
                                setTotaltext(parseInt(price)),
                                setWayPayment('พร้อมเพย์'))}>พร้อมเพย์</button>
        <button onClick={() => (setState(true),
                                setWayPayment('เงินสด'))}>เงินสด</button>
    </Pre_payment>
    <Backdrop show={paySucces} handle={() => setPaySucces(false)}/>
    <Payment_succes state={paySucces} className='payment-success'>
        <h1>ทอนเงินจำนวน</h1>
        <h1>{(total).toFixed(2)}</h1>
        <button style={{ background: '#269146'}} onClick={success_bill}>ปิดการขายสำเร็จ</button>
    </Payment_succes>
    <Payment_blog state={state} className='payment-container'>
      <div className='payment-content'>
            <h2>บิลเลขที่ {location.state[0][0].bill_id}</h2>
            <h2>ราคาสินค้า {(price).toFixed(2)}</h2>
            <h2>เงินที่รับมา {totaltext}</h2>
            <h2>เงินที่ต้องทอน {(total).toFixed(2)}</h2>
            <button onClick={paymentNext}>ยืนยันการชำระเงิน</button>
            <button onClick={() => setState(false)}>วิธีการชำระเงิน</button>
            <Link to='/'><button style={{ background: '#c00017'}}>กลับไปเพิ่มสินค้า</button></Link>
      </div>
      <div className='payment-box'>
        <div className='shotcut-box'>
            <div className='shortcut'>
                {money.map((d,idx) => (
                    <div onClick={() => addTexttotal(`${d}`)} key={idx} className='btn'>
                        <h3>{d}</h3>
                    </div>
                ))}
            </div>
        </div>
        <div className='insert-box'>
            <div className='num1'>
                <div onClick={() => addTexttotal('7')} id='7' className='num'>
                    <h1 id='7'>7</h1>
                </div>
                <div onClick={() => addTexttotal('4')} className='num'>
                    <h1>4</h1>
                </div>
                <div onClick={() => addTexttotal('1')} className='num'>
                    <h1>1</h1>
                </div>
            </div>
            <div className='num2'>
                <div onClick={() => addTexttotal('8')} className='num'>
                    <h1>8</h1>
                </div>
                <div onClick={() => addTexttotal('5')} className='num'>
                    <h1>5</h1>
                </div>
                <div onClick={() => addTexttotal('2')} className='num'>
                    <h1>2</h1>
                </div>
                <div onClick={() => addTexttotal('0')} className='num'>
                    <h1>0</h1>
                </div>
            </div>
            <div className='num3'>
                <div onClick={() => addTexttotal('9')} className='num'>
                    <h1>9</h1>
                </div>
                <div onClick={() => addTexttotal('6')} className='num'>
                    <h1>6</h1>
                </div>
                <div onClick={() => addTexttotal('3')} className='num'>
                    <h1>3</h1>
                </div>
                <div onClick={() => {   setTotaltext('')
                                        setTotal(0)
                                                            }} className='num'>
                    <h1>ลบ</h1>
                </div>
            </div>
        </div>
      </div>
    </Payment_blog>
    </>
  )
}

export default Payment
