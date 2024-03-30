import React, { useEffect, useState } from 'react'
import '../page/css/addproductstock.css'
import DataTable from 'react-data-table-component'
import OptionMap from './OptionMap';
import OptionProductMap from './OptionProductMap';
import OptionMapUnit from './OptionMapUnit';
import axios from 'axios';

let api_url = process.env.REACT_APP_API_URL

class getProductlistStock{
    constructor(stockID,api_url,date,dealer){
        this.stockID = stockID;
        this.api_url = api_url;
        this.date = date;
        this.dealer = dealer
    }

    async getProduct(){
        try {
            const get = axios.post(`${this.api_url}stock/get/`,{
                ID:this.stockID
            })

            return get
        } catch (error) {
            return error
        }
    }

    async deleteProductlistStock(){
        try {
            console.log(this.stockID)
            const result = await axios.delete(`${this.api_url}stock/delete/list/${this.stockID}`)
            return result
        } catch (error) {
            return error
        }
    }

    async savestock(){
        try {
            const savetoStock = await axios.post(`${this.api_url}stock/add`,{
                id_stock : this.stockID,
                dealer : this.dealer,
                date : this.date

            })

            return savetoStock
        } catch (error) {
            return error
        }
    }
}

const columns = (handle_deleteStockList) => [
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

	},
    {
		name: 'Action',
		selector: row => row.totalcost,
        cell: (rows) => <button id='delete-btn' onClick={() => handle_deleteStockList(rows)}>ลบ</button>

	}
];

const AddStock = ({ handle_state , billName , billList , setAlertMessage }) => {

    const [stateAdd, setStateAdd] = useState(false);
    const [deleteCount, setDeleteCount] = useState(0);
    
    const [listAddproduct , setListAddproduct] = useState([]);
    const [list,setlist] = useState([]);
    const [id,setId] = useState('');
    const [productSelected,setProductSelected] = useState([]);
    const [pdt_unitcost,setPdt_unitcost] = useState(0);
    const [pdt_unit,setPdt_unit] = useState('');
    const [pdt_stock,setPdt_stock] = useState(0);
    const [stateInput,setStateInput] = useState(false);
    const [stateName,setStateName] = useState(false);
    const [stateUnit,setStateUnit] = useState(false);

    //billStock
    let date = new Date();
    const [datebill,setDateBill] = useState(billList.date);
    const [dealer, setDealer] = useState(billList.dealer);

    const handle_deleteStockList = async (list) => {

        const getClass = new getProductlistStock(list.id,api_url);
        await getClass.deleteProductlistStock();
        setDeleteCount(deleteCount + 1)
        //alert(list.id)
    }

    const handle_AddState = () => {
        setStateAdd(!stateAdd);
    }

    const handele_Addlist = async () => {
        if(!productSelected.id || pdt_stock == 0 || pdt_unit.length == 0 || pdt_unitcost == 0) return alert('insert product')

        try {
            await axios.post(`${api_url}stock/create`,{
                bill_name: billName,
                pdt_id: productSelected.id,
                pdt_name: productSelected.pdt_name,
                pdt_stock: pdt_stock,
                pdt_unit: pdt_unit,
                pdt_unitcost: pdt_unitcost
            })
            handle_resetValue();
            setStateAdd(false)
        } catch (error) {
            
        }
    }

    const handle_resetValue = () => {
        setProductSelected([]);
        setPdt_stock(0);
        setPdt_unit('');
        setPdt_unitcost(0);
    }

    //console.log(productSelected)

    const handle_stateInput = () => {
        setDealer('');
        setDateBill('');
        setStateInput(true);
    }

    const handle_cancleInput = () => {
        setStateInput(false)
        setStateName(false)
        setStateUnit(false)
    }

    const ReadProductStocks = async() => {
        const StockList = new getProductlistStock(billName,api_url);
        const fetchList = await StockList.getProduct();
        setListAddproduct(fetchList?.data?.rows);

    }

    const handle_saveDarftStock = async() => {
        try {
            const response = await axios.post(`${api_url}stock/add/darft`,{
                id_stock: billName,
                date:datebill,
                dealer: dealer
            })
            alert('success update!!')
            handle_state(); 
        } catch (error) {
            console.log(error)
        }
    }

    const handle_saveToStock = async () => {
        const saveApi = new getProductlistStock(billName,api_url,datebill,dealer);

        const response = await saveApi.savestock();

        setAlertMessage(response?.data?.message);
        if(response?.data?.message == 'success'){
            handle_resetValue();
            handle_state();
        }
       
        
    }

    useEffect(() => {
        ReadProductStocks();
    },[stateAdd,deleteCount])
    

    console.log(datebill)
  return (
    <>
    {stateInput || stateName || stateUnit ? <div className='light-box' onClick={handle_cancleInput}></div> : <></> }
    <div className='addStock-container'>
      <div className='add-header'>
        {dealer?.length > 0 || datebill?.length > 0 ? <button id='btn-2' onClick={handle_saveDarftStock}>บันทึกแบบร่าง</button> : 
        <button id='btn-1' onClick={handle_state}>กลับ</button>}
        <button id='btn-3' onClick={handle_saveToStock}>ยืนยัน</button>
      </div>
      <div className='add-content'>
        <div className='box1'>
            <div id='input' className='wrapper'>
                <div className='input-data'>
                    <input defaultValue={billName} id='pdt_price' type='text' />
                    <div className='underline'></div>
                    <label>หมายเลขใบสินค้า</label>
                </div>
            </div>
            <div id='input' className='wrapper'>
                <div className='input-data'>
                    <input defaultValue={datebill} onChange={(e) => setDateBill(e.target.value)} id='pdt_price' type='date' autoComplete='off'/>
                    <div className='underline'></div>
                    <label>วันที่</label>
                </div>
            </div>
            <div id='input' className='wrapper'>
                <div className='input-data'>
                    <input onClick={handle_stateInput} defaultValue={dealer} value={dealer} id='pdt_price' type='text' autoComplete='off'/>
                    <div className='underline'></div>
                    <label>Supplier</label>
                </div>
                {stateInput && <OptionMap optionSelect={setDealer} stateinput={setStateInput}/> }
            </div>
        </div>
        <div className='box2'>
            <div className='item'>
                <div className='item-header'>
                    <h3>สินค้า</h3>
                    {!stateAdd ? 
                    <>
                        <button onClick={handle_AddState}>เพิ่ม</button>  
                    </> : 
                    <>
                        <button onClick={handele_Addlist}>ยืนยัน</button>
                        <button onClick={handle_AddState}>กลับ</button>
                    </>}
                </div>
                {stateAdd ? 
                <>
                <div className='item-add'>
                    <div id='input' className='wrapper'>
                        <div className='input-data'>
                            <input onClick={() => setStateName(true)} defaultValue={productSelected.pdt_name} id='pdt_price' autoComplete='off' type='text' required/>
                            <div className='underline'></div>
                            <label>ชื่อสินค้า</label>
                        </div>
                        {stateName && <OptionProductMap optionSelect={setProductSelected} stateinput={setStateName}/>}
                    </div>
                    <div id='input' className='wrapper'>
                        <div className='input-data'>
                            <input onChange={(e) => setPdt_stock(e.target.value)} id='pdt_price' type='number' autoComplete='off' required/>
                            <div className='underline'></div>
                            <label>จำนวน</label>
                        </div>
                    </div>
                    <div id='input' className='wrapper'>
                        <div className='input-data'>
                            <input onClick={() => setStateUnit(true)} defaultValue={pdt_unit} id='pdt_price' type='text' autoComplete='off' required/>
                            <div className='underline'></div>
                            <label>หน่วย</label>
                        </div>
                        {stateUnit && <OptionMapUnit optionSelect={setPdt_unit} stateinput={setStateUnit}/>}
                    </div>
                    <div id='input' className='wrapper'>
                        <div className='input-data'>
                            <input onChange={(e) => setPdt_unitcost(e.target.value)} id='pdt_price' type='number' autoComplete='off' required/>
                            <div className='underline'></div>
                            <label>ราค่าต่อหน่วย</label>
                        </div>
                    </div>
                </div>
                </> : 
                <>
                <div className='item-added'>
                    <DataTable className='table'
                        columns={columns(handle_deleteStockList)}
                        data={listAddproduct}
                        persistTableHead
                    />
                </div>
                </>}
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddStock
