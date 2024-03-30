import React, { useEffect, useState } from 'react'
import { useDataProduct } from './page/ItemManage'
import { useAuth } from './page/auth/UserAuth';
import axios from 'axios';
let api_url = process.env.REACT_APP_API_URL

const AddpointProduct = () => {

    const { datauser } = useAuth();
    const { product_list } = useDataProduct();
    const [stateAddPoint ,setStateAddPoint] = useState(true);

    const handele_postPoint = async() => {
        try {
            const check_point = await axios.post(`${api_url}product/point/check`,{
                uid: datauser?.data?.id,
                pdt_name: product_list?.pdt_name
            })
            console.log(check_point)
            if(check_point.data) return alert('alredy');

            const post = await axios.post(`${api_url}product/point/add`,{
                uid : datauser?.data?.id,
                pdt_id: product_list?.id,
                pdt_name : product_list?.pdt_name,
                pdt_barcode : product_list?.pdt_barcode,
                pdt_cateogry : product_list?.pdt_cateogry,
                pdt_cost : product_list?.pdt_cost,
                pdt_img : product_list?.pdt_img,
                pdt_price : product_list?.pdt_price,
                pdt_stock : product_list?.pdt_stock
            })
            setStateAddPoint(false);
        } catch (error) {
            console.log(error)
        }
    }

    const check_Add_point = async() => {
        try {
            const check_point = await axios.post(`${api_url}product/point/check`,{
                uid: datauser?.data?.id,
                pdt_name: product_list?.pdt_name
            })
            //console.log(check_point)
            if(check_point.data) return setStateAddPoint(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        check_Add_point();
    },[])

  return (
    <>
        {stateAddPoint ?  
            <button onClick={handele_postPoint}>ปักหมุดสินค้า</button>
            :
            <button disabled>ปักหมุดสินค้าแล้ว</button>
        }
        
    </>
  )
}

export default AddpointProduct
