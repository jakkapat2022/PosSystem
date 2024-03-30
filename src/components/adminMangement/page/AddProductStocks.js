import React,{useEffect, useState} from 'react'
import { SideBar,Container } from '../../SideBar'
import { useNav } from '../../layout/Nav'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import './css/addproductstock.css'
import AddStock from '../component/AddStock';
import axios from 'axios';
import AlertBox from '../../AlertBox';

let api_url = process.env.REACT_APP_API_URL

const columns = [
	{
		name: 'ลำดับ',
        sortable: true,
    cell: (row,index) => index + 1,
    grow: 0
	},
    {
		name: 'วันที่',
		selector: row => row.date,
        sortable: true,
	},
	{
		name: 'หมายเลข',
		selector: row => row.id_stock,
        sortable: true,

	},
    {
		name: 'ซัพพลาย',
		selector: row => row.dealer,
        sortable: true,

	},
    {
		name: 'รวมยอด',
		selector: row => row.total,
        sortable: true,

	},
    {
		name: 'สถานะ',
		selector: row => row.status,
        sortable: true,

	},
];

const AddProductStocks = () => {
    let navigate = useNavigate();
    const { showSideBar } = useNav();
    const [addState, setAddState] = useState(false);
    const [count,setCount] = useState(0);
    const [billName , setbillName] = useState('');
    const [stockList , setStockList] = useState([]);
    const [billList, setBillList] = useState({});
    const [alertMessage, setAlertMessage] = useState('');

    const handle_state = () => {
        setCount(count + 1);
        setAddState(!addState)
        handle_createNamebill();
    }

    const handle_createNamebill = () => {
        let date = new Date();
        const billName = `ST${(date.getUTCMilliseconds() * (count + 1)).toFixed(0)}/${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        setbillName(billName);
    }

    const handle_updateDarft = (list) => {
        if(list.status == 'ฉบับร่าง'){
            setbillName(list.id_stock);
            setBillList(list)
            setAddState(true);
        }else{
            navigate('bill' , {state: list})
        }
        
    }

    const fetchstock = async () => {
        try {
            const listdata = await axios.post(`${api_url}stock/getall`)
            setStockList(listdata.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchstock();
    },[count])

  return (
    <>
    {alertMessage.length > 0 && <AlertBox message={alertMessage} handle={() => setAlertMessage('')}/>}
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
        {addState ? 
        <>
        <AddStock setAlertMessage={setAlertMessage} billList={billList} billName={billName} handle_state={handle_state}/>
        </> :
        <>
        <div className='addStock-container'>
            <div className='header'>
                <h1>ประวัติการซื้อสินค้าเข้าร้าน</h1>
                <button onClick={handle_state}>สร้างใบคำสั่งซื้อ</button>
            </div>
            <div className='addstock-table'>
                <DataTable className='table'
                    columns={columns}
                    data={stockList}
                    pagination
                    subHeader
                    persistTableHead
                    highlightOnHover
                    onRowClicked={(e) => handle_updateDarft(e)}
                />
            </div>
        </div>
        </>
        }
    </Container>
    </>
  )
}

export default AddProductStocks
