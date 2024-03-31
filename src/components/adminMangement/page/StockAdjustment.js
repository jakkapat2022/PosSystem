import React, { useEffect, useState } from 'react'
import { SideBar , Container} from '../../SideBar'
import { Link, useNavigate} from 'react-router-dom'
import { useNav } from '../../layout/Nav'
import { ReactTable } from '../component/ReactTable'
import './css/stockadjustment.css'
import axios from 'axios'
let api_url = process.env.REACT_APP_API_URL;

const columns = [
    {
        name: 'รายการ',
        selector: row => row.name
    },
    {
        name: 'วันที่',
        selector: row => row.createdAt
    },
    {
        name: 'มูลค่าสูญหาย',
        selector: row => row.lostCost
    },
    {
        name: 'มูลค่าเพิ่ม',
        selector: row => row.moreCost
    },
    {
        name: 'สถานะ',
        selector: row => row.status
    }
]

const StockAdjustment = () => {
    let navigate = useNavigate();
    const {showSideBar} = useNav();
    const [adjustList, setAdjustList] = useState([]);

    const getDataAdjustment = async () => {
        try {
            const results = await axios.get(`${api_url}stock/adjust/get`)

            setAdjustList(results.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handle_onClick = (list) => {
        if(list.status == 'ฉบับร่าง') return navigate('add' ,{state:list})
        if(list.status == 'สำเร็จ') return navigate('success' ,{state:list})
    }

    useEffect(() => {
        getDataAdjustment();
    },[])

  return (
    <>
    <SideBar state={true}/>
    <Container sideBar={showSideBar} className='container con-ani'>
        <div className='StockAdj-con'>
            <div className='content'>
                <div className='header'>
                    <h3>การปรับสต็อก</h3>
                    <Link to={'add'}><button>เพิ่มรายการ</button></Link>
                </div>
                <ReactTable columns={columns} dataTable={adjustList} handle={handle_onClick}/>
            </div>
        </div>
    </Container>
    </>
    
  )
}

export default StockAdjustment
