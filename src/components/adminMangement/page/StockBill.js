import React,{ useState , useEffect } from 'react'
import { useLocation , useNavigate , Navigate} from 'react-router-dom'
import { SideBar , Container } from '../../SideBar';
import { useNav } from '../../layout/Nav';
import './css/stockbill.css'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ConfirmForm from '../auth/ConfirmForm';

let api_url = process.env.REACT_APP_API_URL
const columns = [
    {
		name: 'รายการ',
		selector: row => row.pdt_name,
        sortable: true,
	},
	{
		name: 'จำนวน',
		selector: row => row.stock,
        sortable: true,

	},
    {
		name: 'หน่วย',
		selector: row => row.unit,
        sortable: true,

	},
    {
		name: 'ต้นทุนต่อหน่วย',
		selector: row => row.unitcost,
        sortable: true,

	},
    {
		name: 'รวมยอด',
		selector: row => row.totalcost,
        sortable: true,

	}
];

const StockBill = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { showSideBar } = useNav();
    const [listPdt, setListPdt] = useState([]);
    const [ShowLogin,setShowLogin] = useState(false);


    const liststock = async () => {
        try {
            const result = await axios.post(`${api_url}stock/get/`,{
                ID : state.id_stock
            })
            setListPdt(result.data.rows)
        } catch (error) {
            console.log(error)
        }
    }

    const handle_delete = async () => {
        try {
            const result = await axios.delete(`${api_url}stock/delete?id_stock=${listPdt[0].id_stock}`)

            return navigate("/admin/stock")
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(state == null) return navigate('/admin/stock');
        liststock();
    },[])

  return (
    <>
    {ShowLogin && <ConfirmForm functionNext={handle_delete} handleShow={setShowLogin} />}
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
        <div className='Stockbill-container'>
            <div id='input' className='wrapper'>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state.id_stock} />
                    <div className='underline'></div>
                    <label>สต๊อกบิล</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state.date} />
                    <div className='underline'></div>
                    <label>วันที่</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state.dealer} />
                    <div className='underline'></div>
                    <label>dealer</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state.total} />
                    <div className='underline'></div>
                    <label>จำนวนเงิน</label>
                </div>
                <div className='btn'>
                    <button onClick={() => setShowLogin(!ShowLogin)}>ลบบิล</button>
                </div>
            </div>

            <div className='table'>
                <DataTable className='table-1'
                        columns={columns}
                        data={listPdt}
                        persistTableHead
                />
            </div>
        </div>
    </Container>
    </>
  )
}

export default StockBill
