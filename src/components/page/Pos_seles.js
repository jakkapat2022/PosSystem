import React, { useState ,useEffect  } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useNav } from '../layout/Nav';
import axios from 'axios';
import AddCateogry from '../AddCateogry';
import Product_search from '../Product_search';
import Read_bill from '../Read_bill';
import Callbill from '../Callbill';
import Backdrop from '../Backdrop';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import { useAuth } from './auth/UserAuth';
import ShowProductToSele from '../ShowProductToSele';
import AlertBox from '../AlertBox';
import { SideBar , Container } from '../SideBar';


class PostBill {
    post_id
    constructor(id,api_url){
        this.id = id
        this.api_url = api_url
    }

    async checkIsProduct(){
        const res = await axios.get(`${this.api_url}product/check/stock?id=${this.id}`)
        return res
    }

    async postProductTobill(){
       // console.log(this.post_id)
    }
}

const Pos_seles = () => {
    
    const { showSideBar , setPageCurrent } = useNav();
    const {datauser , error , setError} = useAuth();
    const state = useLocation();
    let api_url = process.env.REACT_APP_API_URL;
    let navigate = useNavigate();
    let date = new Date();
    let newT = Date.now() + date.getDate();
    const [cookies, setCookie] = useCookies(['bill'])
    const [data, setData] = useState([]);
    const [OneProduct ,setOneProduct] = useState({});
    const [billdata, setBillData] = useState([]);
    const [billProduct, setBillProduct] = useState([]);
    const [cateogry ,setCateogry] = useState('');
    const [keyword, setKeyword] = useState('');
    const [page ,setPage] = useState(1);
    const [bill,setBill] = useState(cookies.bill || newT);
    const [isBill ,setIsBill] = useState(true);
    const [currentBill, setCurrentBill] = useState([cookies.bill] || newT);
    const [billcount, setBillCount] = useState(0);
    const [pauseBillCount, setPauseBillCount] = useState(0);
    const api = `${api_url}productstocks/get`
    const query = `?keyword=${keyword}&page=${page}`
    const [total ,setTotal] = useState(0);

    const [hidden,setHidden] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isProductPointActive , setIsProductPointActive] = useState(false);
    const apiBill = `${api_url}bills/get`

    
    const payment = () => {
        if(total <= 0) return setAlertMessage('กรุณาเพิ่มสินค้า');

        navigate("/payment", {state: billProduct});
    }

    const getBill_data = async () => {
        try {
          const data = await axios.get(apiBill)
          setBillData([data]);
          setHidden(true)
          setIsBill(false)
        } catch (error) {
          console.log({ error : error})
        }
    }

    const get_data = async () => {
        if(isProductPointActive) return 
        try {
          const data = await axios.post(api + query + `&cateogry=${cateogry}&orderBy=pdt_name`)
          setData([data]);
        } catch (error) {
          console.log({ error : error})
        }
    }

    const getProductPoint = async () => {
        if(!isProductPointActive) return
        try {
            const pointData = await axios.post(`${api_url}product/point/get${query}&uid=${datauser?.data?.id}`)
            //console.log(pointData)
            setData([pointData])
        } catch (error) {
            console.log(error)
        }
    }

    //console.log(isProductPointActive)

    const newbill = async () => {
        //if(isBill === true) return ;

        if(total <= 0) return setAlertMessage('ไม่สามารถพักบิลได้ยังไม่เพิ่มสินค้า');

        let date = new Date();
        let newbill = Date.now() + date.getDate();

        try {
            await axios.post(`${api_url}bills/update/status`,{
                bill_id:  bill,
                status : 1
            })
            setCookie('bill', newbill, { path: '/' })
            setCurrentBill(newbill)
            setBillCount(billcount + 1)
            setBill(newbill);
            setPauseBillCount(0)
            setIsBill(!isBill);
        } catch (error) {
            console.log(error)
        }
        
    }

    const add_product_to_bill = async (productlist) => {
        if(productlist.pdt_stock < 1) return setAlertMessage('สินค้าหมด');
        
        try {

            const results = []

            if(isProductPointActive){
                console.log('point')
                const res = new PostBill(productlist.pdt_id,api_url);
                const getdataRes = await res.checkIsProduct().then(res => {
                    return res.data
                })
                results[0] = getdataRes;
            }else{
                console.log('no point')
                const res = new PostBill(productlist.id,api_url);
                const getdataRes = await res.checkIsProduct().then(res => {
                    return res.data
                })
                results[0] = getdataRes;
            }

            

            //console.log(results[0].id)
            const res = await axios.post(`${api_url}bills/add`,{
                billname: /*currentBill[0]?.data?.name || */ bill ,
                id_pdt: results[0].id,
                name: results[0].pdt_name,
                barcode: results[0].pdt_barcode,
                price: results[0].pdt_price
               })
                setCurrentBill(bill)
                setBillCount(billcount + 1)
                setIsBill(false);
                setCookie('bill', bill, { path: '/' })
              console.log(res);

        } catch (error) {
            console.log(error)
        }

        
    }

    console.log(error)

   

    const handle_next = () => {
        if(page == data[0]?.data?.data?.totalPages) return
        setPage(page + 1);
    }

    const handle_prev = () => {
        if(page == 1) return
        setPage(page - 1);
    }
    

    useEffect(() => {
        
        get_data();
        getProductPoint();
        
        
    },[cateogry,keyword,page,billcount]);
    console.log(state.state)
    useEffect(() => {
        if(billcount >= 1){
            setBillCount(billcount + 1)
        }     
        setAlertMessage(error)     
        //setCookie('bill', '1710411105720-14-3-2024', { path: '/' })
    },[]);

    //console.log({bill : bill})
    //console.log({currentBill : currentBill})
    //console.log(process.API_URL)
    //console.log(state)

    
  return (
    <>
    <Backdrop handle={() => setHidden(false)} show={hidden}/>
    {alertMessage.length > 1 && <AlertBox message={alertMessage} handle={() => (setAlertMessage('') , setError(''))}/>}
    <SideBar/>
    <Container sideBar={showSideBar} className='container-sele'>
        <Callbill setCookie={setCookie} show={hidden} bill={billdata} setBill={setBill} setState={setPauseBillCount} current={setCurrentBill} sethidden={setHidden} setCount={setBillCount} count={billcount}/>
      <div className='sele-product'>
        <div className='sortcut'>
            <AddCateogry isProductPointActive={setIsProductPointActive} getProductPoint={getProductPoint} option={(e) => setCateogry(e)} all={true}/>
            <div style={{ 'display' : 'flex' , 'justifyContent': 'center' , 'alignItems': 'center'}}>
                <div onClick={handle_prev} style={{ 'margin' : '0rem 0.2rem'}} className='prev'>
                    <h3>PREV</h3>
                </div>
                <div onClick={handle_next} className='next'>
                    <h3>NEXT</h3>
                </div>
            </div>   
            <div style={{ 'display' : 'flex' , 'justifyContent': 'center' , 'alignItems': 'center'}}>
                <div className='product-search'>
                    <Product_search option={(e) => setKeyword(e.target.value)}/>
                </div>
                <div style={{ 'margin' : '0rem 0.2rem'}} onClick={newbill} className='pause-bill'>
                    <h3>พักบิล</h3>
                </div>
                <div onClick={getBill_data} className='call-bill'>
                    <h3>เรียกบิล</h3>
                </div>
            </div>
        </div>
        <div className='item-content'>
           <ShowProductToSele product={data} add_product_to_bill={add_product_to_bill}/>
        </div>
      </div>
      <div className='sale-pos'>
        <div className='sale-content'>
            <div className='sale-header'>
                <h3>เลขที่ใบเสร็จ</h3>
                <h4>{bill}</h4>
            </div>
            <div className='sale-item'>
                <Read_bill bills_data={setBillProduct} setBill={setBill} billId={currentBill} setCount={setBillCount} count={billcount} total={setTotal} />
            </div>
            <div className='sale-footer'>
                <h3>รวมทั้งหมด</h3>
                <h4>{(total).toFixed(2)}</h4>
            </div>
        </div>
        <div className='btn-sale'>
            <button onClick={payment}>ชำระเงิน</button>
        </div>
      </div>
    </Container>
    </>
  )
}

export default Pos_seles
