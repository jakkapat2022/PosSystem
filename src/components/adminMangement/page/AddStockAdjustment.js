import React, { useState ,useEffect } from 'react'
import { SideBar , Container} from '../../SideBar'
import { useNav } from '../../layout/Nav'
import { ReactTable } from '../component/ReactTable'
import { Link, useLocation , useNavigate} from 'react-router-dom'
import './css/stockadjustment.css'
import axios from 'axios'
import ConfirmForm from '../auth/ConfirmForm'
let api_url = process.env.REACT_APP_API_URL;

export class Adjust{

    constructor(api_url,id_adjust,productlist,currentStock){
        this.api = api_url;
        this.id_adjust = id_adjust;
        this.productlist = productlist;
        this.currentStock = currentStock;
    }

    async createAdjust(){
        try {
            const create = await axios.post(`${this.api}stock/adjust/create`,{
                id_adjust: this.id_adjust,
                pdt_id: this.productlist.id,
                pdt_name: this.productlist.pdt_name,
                pdt_stock: this.productlist.pdt_stock,
                pdt_price: this.productlist.pdt_price,
                currentStock: this.currentStock
            })

            return create
        } catch (error) {
            return error
        }
    }

    async getChildren(){
        try {
            const results = await axios.post(`${this.api}stock/adjust/getchild`,{
                id_adjust: this.id_adjust
            })

            return results
        } catch (error) {
            return error
        }
    }

    async updateCommit(){
        try {
            const results = await axios.post(`${this.api}stock/adjust/commit`,{
                id_adjust: this.id_adjust
            })
            return results
        } catch (error) {
            return error
        }
    }

    async updoCommit(){
        try {
            const results = await axios.post(`${this.api}stock/adjust/undo`,{
                id_adjust: this.id_adjust
            })
            return results
        } catch (error) {
            return error
        }
    }

}

const AddStockAdjustment = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const {showSideBar} = useNav();
    const [classinput, setClassInput] = useState(['input-field','show-input']);
    const [classinputState, setClassInputState] = useState(false);
    const [keyword , setKeyword] = useState('');
    const [opdata , setopdate] = useState([]);
    const [selector,setSelector] = useState(null);
    const [AdjustChlidren,setAdjustChildren] = useState([]);
    const [stateSelector, setstateSelector] = useState(false);
    const [ShowLogin,setShowLogin] = useState(false);

    const [nameadjust,setNameAdjust] = useState('');
    const [currentStock, setCurrentStock] = useState('');

    const [countState , setCountState] = useState(0);

    const handle_showAdd = () => {
        if(nameadjust.length < 3) return alert('ใส่ชื่อการปรับสต๊อก')
        setClassInputState(!classinputState)
    }

    const query = `productstocks/get?keyword=${keyword}&orderBy=pdt_name`

    const search_product = async () => {
        try {
            const productList = await axios.post(api_url +query);
            setopdate([productList]);
        } catch (error) {
            console.log(error);
        }
    }

    const reset_list = () => {
        setKeyword('')
        setstateSelector(false)
    }

    const columns = [
        {
            name: 'สินค้า',
            selector: row => row.pdt_name
        },
        {
            name: 'จำนวนในระบบ',
            selector: row => row.pdt_stock
        },
        {
            name: 'จำนวนจริงที่นับได้',
            selector: row => row.current_stock
        },
        {
            name: 'มูลค่า',
            selector: row => Math.abs((row.pdt_stock - row.current_stock) * row.pdt_price)
        }
    ]

    //console.log(selector)

    const handle_create = async (id_adjust,productList) => {
        if(selector == null || currentStock == 0) return alert('กรุนาเลือกสินค้า') & setClassInputState(!classinputState)
        const _class = new Adjust(api_url,id_adjust,productList,currentStock);

        const response = await _class.createAdjust();

        //console.log(response)
        setCountState(countState + 1);
        setSelector(null);
        setCurrentStock('');
        setClassInputState(!classinputState)
    }

    const handle_commit = async () => {
        const _class = new Adjust(api_url,nameadjust)

        const response = await _class.updateCommit();
        if(response.data == 'no data') return alert('กรุณาเพิ่มรายการ') & setShowLogin(false)

        return navigate('/admin/stock/stockadjustment')
    }

    useEffect(() => {
        search_product();
    },[keyword])

    useEffect(() => {

        if(state && countState <= 2){
            setNameAdjust(state.name)
            setCountState(countState + 1)
        }

        const get = async () => {
            const _class = new Adjust(api_url,nameadjust)
            const results = await _class.getChildren()
            setAdjustChildren(results)
        }

        get();

    },[countState])

    
    console.log(state)

  return (
    <>
    <SideBar state={true}/>
    {ShowLogin && <ConfirmForm functionNext={handle_commit} handleShow={setShowLogin}/>}
    {classinputState && <div className='light-box' onClick={handle_showAdd}></div>}
    <Container sideBar={showSideBar} className='container con-ani'>
        <div className='StockAdj-con'>
            <div className='content'>
                <div className='header'>
                    <h3>สร้างใบปรับสต็อก</h3>
                    <div>   
                        <Link to={'/admin/stock/stockadjustment'}><button>บันทึกแบบร่าง</button></Link>
                        <button onClick={() => setShowLogin(!ShowLogin)}>บันทึก</button>
                    </div>
                </div>
                <div id='input-field' className={classinputState ? classinput[1] : classinput[0]}>
                    <div>
                        <div id='input' className='wrapper'>
                            <div className='input-data'>
                                <input onChange={(e => setKeyword(e.target.value))} value={stateSelector ? selector?.pdt_name : keyword} onClick={reset_list} type='text' autoComplete='off' placeholder='สินค้า' />
                                <div className='underline'></div>
                            </div>
                            <div className='input-data'>
                                <input type='number' value={stateSelector ? selector?.pdt_stock : ''} autoComplete='off' placeholder='จำนวนในระบบ' />
                                <div className='underline'></div>
                            </div>
                            <div className='input-data'>
                                <input onChange={(e) => setCurrentStock(e.target.value)} value={currentStock} min='0' type='number' autoComplete='off' placeholder='จำนวนที่นับได้' />
                                <div className='underline'></div>
                            </div>
                            <button onClick={() => handle_create(nameadjust,selector)}>เพิ่ม</button>
                        </div>  
                    </div>
                    {!stateSelector && <div id='selectProduct'>
                    {opdata[0]?.data?.data?.data?.map((data,idx) => (
                        <div key={idx} onClick={() => setSelector(data) & setstateSelector(true)} className='option-dropdown'>
                            <img src={`${api_url}product/img/${data.pdt_img}`} alt={data.pdt_name} width={50}/>
                            <strong>{data.pdt_name}</strong>
                        </div>
                    ))}
                    </div>}
                </div>
                <div id='input' className='wrapper'>
                    <div className='input-data'>
                        <input onChange={(e) =>  countState == 0 && setNameAdjust(e.target.value)} value={nameadjust} type='text' autoComplete='off' placeholder='ชื่อรายการ' />
                        <div className='underline'></div>
                    </div>
                    <br/>
                    <button id='addProduct' onClick={handle_showAdd}>เพิ่มสินค้า</button>
                </div>
                <ReactTable columns={columns} dataTable={AdjustChlidren?.data?.rows}/>
            </div>
        </div>
    </Container>
    </>
    
  )
}

export default AddStockAdjustment
