import React, { useEffect , useState , createContext , useContext} from 'react'
import axios from 'axios'
import { MdCloudUpload } from "react-icons/md";
import Product_table from '../Product_table';
import AddCateogry from '../AddCateogry.js';
import Product_search from '../Product_search.js';
import Product_table_colum from '../Product_table_colum.js';
import ShowProduct from '../ShowProduct.js';
import { useAuth } from './auth/UserAuth.js';
import { useNav } from '../layout/Nav.js';
import AlertBox from '../AlertBox.js';
import { SideBar , Container } from '../SideBar.js';
import { useLocation } from 'react-router-dom';

const Product_data = createContext();

export const ItemManageItem = () => {

    const { datauser } = useAuth();
    const { showSideBar ,setPageCurrent } = useNav();
    const _state = useLocation();
    setPageCurrent(_state.state)
    let api_url = process.env.REACT_APP_API_URL;
    const [state , setState]  = useState(false);
    const [itemstate , setItemState]  = useState(false);
    const [product_list , setProduct_list] = useState([]);
    const [productData , setProductData] = useState([]);
    const [keyword ,setKeyword] = useState('');
    const [cateogry ,setCateogry] = useState('');
    const [limit ,setLimit] = useState(25);
    const [page ,setPage] = useState(1);
    const [sortBy ,setSortby] = useState('asc');
    const [orderBy ,setOrderBy] = useState('pdt_cateogry');
    const query = `?keyword=${keyword}&limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
    const [isProductPointActive , setIsProductPointActive] = useState(false); //getproduct or getPointProduct
    
    //console.log(keyword)
    const get_data = async () => {
        if(isProductPointActive) return
        try {
          const data = await axios.post(`${api_url}productstocks/get${query}&cateogry=${cateogry}&uid=${datauser?.data?.id}`)
          setProductData([data]);
        } catch (error) {
          console.log({ error : error})
        }
      }

    const getProductPoint = async () => {
        if(!isProductPointActive) return
        try {
            const pointData = await axios.post(`${api_url}product/point/get${query}&uid=${datauser?.data?.id}`)
            setProductData([pointData]);
            console.log(`${api_url}product/point/get${query}&uid=${datauser?.data?.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handle_show_product_page = (product=null) => {
        setProduct_list(product)
        setItemState(!itemstate)
    }

    const pages = (e) => {

        if(e.selected == 0){
          setPage(1)
        }else if(e.selected > 0){
          setPage(e.selected + 1)
        }
          //console.log(page)
          //setPageCurrent( PageCurrent + 1)
      }

    useEffect(() => {
        get_data();
        getProductPoint();
    },[page,keyword,cateogry])

    console.log(productData)

  return (
    <Product_data.Provider value={{ pages , product_list , productData , handle_show_product_page }}>
        <>
        <SideBar state={true}/>
        <Container sideBar={showSideBar} className='container con-ani'>
            <div className='itemblog-container'>
            <div className='box-item'>
            {itemstate ? 
                <ShowProduct State={setItemState}/>
            :   
            <>
                <div className='product-search'>
                    <AddCateogry 
                    all={true} 
                    option={(e) => setCateogry(e)}
                    isProductPointActive={setIsProductPointActive}
                    getProductPoint={getProductPoint}
                    />
                    <button onClick={() => setState(!state)}>{state ? 'ตราราง': 'รูปภาพ'}</button>
                    <Product_search option={(e) => setKeyword(e.target.value)}/>
                </div>
                {productData[0]?.data?.data?.data.length == 0 ? 
                    <> 
                        <div className='product-table-box'>
                            <h1>ไม่พบสินค้า</h1>
                            <br/>
                        </div>
                    </>
                    :
                    <>

                    </>
                }
                {state ? <Product_table 
                            data_product_table={setProduct_list} 
                            search={keyword} 
                            ctg={cateogry}
                            isProductPointActive={isProductPointActive}
                            />
                    :  <Product_table_colum 
                            data_product_table={setProduct_list} 
                            search={keyword} 
                            ctg={cateogry}
                            isProductPointActive={isProductPointActive}
                            />
                }
            </>
            }
            </div>
            </div>
        </Container>
    </>
    </Product_data.Provider>
  )
}

export const useDataProduct = () => {
    return useContext(Product_data);
}

export const ItemManageItemAdd = () => {

    const { showSideBar } = useNav();
    const [image , setImage] = useState([]);
    const [imageUrl , setImageUrl] = useState([]);

    //value
    const [pdt_name, setPdt_name] = useState('');
    const [pdt_barcode, setPdt_barcode] = useState('');
    const [pdt_cateogry, setPdt_cateogry] = useState('');
    const [pdt_cost, setPdt_cost] = useState('');
    const [pdt_img, setPdt_img] = useState([]);
    const [pdt_price, setPdt_price] = useState('');
    const [pdt_stock, setPdt_stock] = useState('');

    //alert box state
    const [alertMessage,setAlertMessage] = useState('');

    useEffect(() => {
        if(image.length < 1) return;
        const newImageUrl = [];
        image.forEach((img) => newImageUrl.push(URL.createObjectURL(img)))
        setImageUrl(newImageUrl)
    },[image]);

    const onselect_img = (event) => {
        setImage([...event.target.files])
        setPdt_img(event.target.files[0])
        //console.log(event.target.files)
    }

    const handle_select_img = (e) => {
        const inputFile = document.querySelector('#pdt_img');
        inputFile.click();
    }

    const handle_cancel_select_img = () => {
        setImage([]);
        setImageUrl([]);
        setPdt_img([]);
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append("pdt_name", pdt_name);
        formData.append("pdt_barcode", pdt_barcode);
        formData.append("pdt_cateogry", pdt_cateogry);
        formData.append("pdt_cost", pdt_cost);
        formData.append("pdt_price", pdt_price);
        formData.append("pdt_stock", pdt_stock);
        formData.append("product", pdt_img);

        if(pdt_name.trim().length == 0){
            return setAlertMessage('plese enter name')
        }else if(pdt_barcode.trim().length == 0){ 
            return setAlertMessage('plese enter barcode')
        }else if(pdt_cateogry.trim().length == 0){ 
            return setAlertMessage('plese enter cateogry')
        }else if(pdt_price.trim().length == 0){
            return setAlertMessage('plese enter price')
        }else if(pdt_stock.trim().length == 0){
            return setAlertMessage('plese enter stock')
        }

        try {
            await axios.post("http://localhost:3003/productstocks/create",formData, {
                headers: { "Content-Type": "multipart/form-data" },
               }).then((response) => {
                // handle the response
                console.log(response.data);
                alert(response.data.error)
              });
        } catch (error) {
            console.log(error)
            alert(error)
        } finally {
            alert("success")
        }
    }

    /*
    console.log(pdt_name)
    console.log(pdt_barcode)
    console.log(pdt_cost)
    console.log(pdt_cateogry)
    console.log(pdt_cost)
    console.log(pdt_price)
    console.log(pdt_stock)
    console.log(pdt_img) */
    
    //console.log(pdt_img)
    //console.log(image)
    //console.log(pdt_cateogry)

    return (
      <>
        {alertMessage.length > 1 && <AlertBox message={alertMessage} handle={() => setAlertMessage('')}/>}
        <SideBar state={true}/>
          <Container sideBar={showSideBar} className='container con-ani'>
                <div className='blog-item'>
                    <div id='product'>
                        
                        <div className='form-blog'>
                            <div className='img-wrapper'>
                                <div className='img-input'>
                                    <div className='img-blog'>
                                        <div className='img-blog-content'>
                                            {image.length < 1 ? 
                                            <div onClick={handle_select_img} className='content-emty'>
                                                <MdCloudUpload className='icon'/>
                                                <h4>กรุณาอัพโหลดรูปสินค้า</h4>
                                            </div>
                                            :
                                            <div>
                                                { imageUrl.map((img,id) => (
                                                <img onClick={handle_cancel_select_img}  key={id} src={img}/>
                                            ))}
                                            </div> 
                                            }
                                        </div>
                                        <input onChange={onselect_img} id='pdt_img' type='file' accept='image/*' hidden></input>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='input-data'>
                                    <input onChange={(e) => setPdt_name(e.target.value)} id='pdt_name' type='text' required/>
                                    <div className='underline'></div>
                                    <label>ชื่อสินค้า</label>
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='input-data'>
                                    <input onChange={(e) => setPdt_barcode(e.target.value)} id='pdt_barcode' type='number' required/>
                                    <div className='underline'></div>
                                    <label>บาร์โค้ด</label>
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='input-data'>
                                    <input onChange={(e) => setPdt_stock(e.target.value)} id='pdt_stock' type='text' required/>
                                    <div className='underline'></div>
                                    <label>จำนวนสินค้า</label>
                                </div>
                            </div>
                            <AddCateogry option={(e) => setPdt_cateogry(e)} all={false}/>
                            <div className='wrapper'>
                                <div className='input-data'>
                                    <input onChange={(e) => setPdt_price(e.target.value)} id='pdt_price' type='text' required/>
                                    <div className='underline'></div>
                                    <label>ราคาขาย</label>
                                </div>
                            </div>
                        </div>
                        <div className='blog-btn'>
                            <div className='btn-form-upload'>
                                <button onClick={upload}>เพิ่มสินค้า</button>
                            </div>
                            <div className='btn-form-preupload' >
                                <button onClick={upload} >บันทึกแบบร่าง</button>
                            </div>
                            <div className='btn-form-cancel'>
                                <button onClick={upload} >ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
          </Container>
      </>
    )
}

export const ItemManageType = () => {
    return (
      <>
          <div className='home'>
              <h3 >การจัดการสินค้า/หมวดหมู่</h3>
          </div>
      </>
    )
}

