import React, { useState ,useEffect} from 'react'
import Paginate from './paginate';
import { useDataProduct } from './page/ItemManage';
let api_url = process.env.REACT_APP_API_URL;

const Product_table = () => {

    const { handle_show_product_page , productData , pages } = useDataProduct();

  return (
    <div>
      <div className='product-card'>
        { productData[0]?.data?.data?.data.map((d,idx) => (
            <div onClick={() => handle_show_product_page(d)} key={idx} className='product-item'>
              <div className='product-content'>
                <div className='product-img'>
                  <div className='imgs'>
                    <img src={`${api_url}product/img/${d.pdt_img}`}/>
                  </div> 
                </div>
                <div className='product-text'>
                  <h5>ชื่อสินค้า: {d.pdt_name}</h5>
                  <h5>บาร์โค้ด: {d.pdt_barcode}</h5>
                  <h5>หมวดหมู่: {d.pdt_cateogry}</h5>
                  <h5>ราคาต้นทุน: {d.pdt_cost}</h5>
                  <h5>ราคาขาย: {d.pdt_price}</h5>
                  <h5>จำนวนสินค้า: {d.pdt_stock}</h5>
                </div>
              </div>
            </div>
          ))
          }
      </div>
        <Paginate currentPage={productData[0]?.data?.data?.totalPages} pages={pages}/>
    </div>
  )
}

export default Product_table
