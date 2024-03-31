import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SideBar , Container} from '../../SideBar'
import { useNav } from '../../layout/Nav'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Adjust } from './AddStockAdjustment'
import ConfirmForm from '../auth/ConfirmForm'
let api_url = process.env.REACT_APP_API_URL;

const columns = [
    {
		name: 'สินค้า',
		selector: row => row.pdt_name,
	},
	{
		name: 'จำนวนในระบบ',
		selector: row => row.pdt_stock,

	},
    {
		name: 'จำนวนที่นับได้',
		selector: row => row.current_stock,

	},
    {
		name: 'มูลค่า',
		selector: row => Math.abs((row.pdt_stock - row.current_stock) * row.pdt_price),

	}
];

const SuccessStockAdjustment = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { showSideBar } = useNav();
    const [listChildren, setListChildren] = useState([]);
    const [ShowLogin,setShowLogin] = useState(false);

    const getChildren = async () => {
        const _class = new Adjust(api_url,state?.name)
        const result = await _class.getChildren()
        setListChildren(result.data.rows)
    }

    const handle_delete = async () => {
        const _class = new Adjust(api_url,state?.name)
        const result = await _class.updoCommit()
        
        return navigate("/admin/stock/stockadjustment")
    }

    useEffect(() => {
        if(state == null) return navigate("/admin/stock/stockadjustment")

        getChildren();
    },[])

    console.log(listChildren)

  return (
    <>
    <SideBar state={true}/>
    {ShowLogin && <ConfirmForm functionNext={handle_delete} handleShow={setShowLogin} />}
    <Container sideBar={showSideBar} className='container con-ani'>
    <div className='Stockbill-container'>
            <div id='input' className='wrapper'>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state?.name} />
                    <div className='underline'></div>
                    <label>ชื่อรายการ</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state?.createdAt} />
                    <div className='underline'></div>
                    <label>วันที่</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state?.lostCost} />
                    <div className='underline'></div>
                    <label>lostCost</label>
                </div>
                <div className='input-data'>
                    <input type='text' autoComplete='off' value={state?.moreCost} />
                    <div className='underline'></div>
                    <label>moreCost</label>
                </div>
                <div className='btn'>
                    <button onClick={() => setShowLogin(!ShowLogin)}>ลบบิล</button>
                </div>
            </div>

            <div className='table'>
                <DataTable className='table-1'
                        columns={columns}
                        data={listChildren}
                        persistTableHead
                />
            </div>
        </div>
    </Container>
    </>
  )
}

export default SuccessStockAdjustment
