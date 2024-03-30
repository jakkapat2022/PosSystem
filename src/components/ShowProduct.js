import React from 'react'
import { useDataProduct } from './page/ItemManage'
import AddpointProduct from './AddpointProduct'
let api_url = process.env.REACT_APP_API_URL

const ShowProduct = ({ State }) => {

    const { product_list ,handle_show_product_page } = useDataProduct();
    
  return (
    <>
        <div className='update-item-blog'>
            <div className='update-item-content-img'>
                <img src={`${api_url}product/img/${product_list.pdt_img}`}/>
            </div>
            <div className='update-item-content'>
                <AddpointProduct/>
                <h2>id {product_list.id}</h2>
                <h2>name {product_list.pdt_name}</h2>
                <h2>barcode {product_list.pdt_barcode}</h2>
                <h2>cateogry {product_list.pdt_cateogry}</h2>
                <h2>cost {product_list.pdt_cost}</h2>
                <h2>price {product_list.pdt_price}</h2>
                <h2>stock {product_list.pdt_stock}</h2>
                <button onClick={() => handle_show_product_page()}>Back</button>
            </div>
        </div>
    </>
  )
}

export default ShowProduct
